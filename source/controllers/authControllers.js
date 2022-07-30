const bcrypt = require("bcryptjs");
const db = require("../Models");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const {
	validateEmail,
	validateDate,
	validatePassword,
	validateSexe,
} = require("../Utilities/auth");
const hashPassword = (password) => {
	return bcrypt.hashSync(password, saltRound);
};

const User = db.users;

const addUser = async (req, res) => {
	let data = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password1,
		password_confirmation: req.body.password2,
		date_naissance: req.body.birthday,
		sexe: req.body.sexe,
	};

	if (
		!data.firstname ||
		!data.lastname ||
		!data.email ||
		!data.password ||
		!data.password_confirmation ||
		!data.date_naissance ||
		!data.sexe
	) {
		res.status(400).json({
			error: true,
			message: "Donné erroné ou manquent",
			data,
		});
	} else if (
		!validateEmail(data.email) ||
		!validateDate(data.date_naissance) ||
		!validatePassword(data.password) ||
		!validateSexe(data.sexe)
	) {
		res.status(409).json({
			error: true,
			message: "Donné erroné",
			data
		});
	} else if (data.password !== data.password_confirmation) {
		res.status(409).json({
			error: true,
			message: "Les deux mots de passe ne correspondent pas",
		});
	} else {
		const userExist = await User.findOne({
			where: { email: data.email },
		});
		if (userExist) {
			res.status(409).json({
				error: "true",
				message: "L'email est deja utilisé",
			});
		} else {
			try {
				const newUser = ({
					firstname,
					lastname,
					email,
					password,
					date_naissance,
					sexe,
				} = data);
				newUser.password = hashPassword(data.password);
				const user = await User.create(newUser);
				res.status(201).json({
					error: false,
					message: "Utilisateur crée!",
					user,
				});
			} catch (err) {
				res.status(400).json({
					error: true,
					message: "Une erreur est survenu",
					err,
				});
			}
		}
	}
};

const loginUser = async (req, res) => {
	let { email, password } = {
		email: req.body.email,
		password: req.body.password,
	};

	if (!password || !email) {
		res.status(400).json({ message: "password or email no provided" });
	}
	try {
		const user = await User.findOne({ where: { email: email } });
		if (!user) {
			res.status(400).json("User not found");
		} else {
			bcrypt.compare(password, user.password).then((result) => {
				if (result) {
					token = user.token;
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: 3600 * 60 * 1000 * 24,
						sameSite: "none",
						secure: true,
					});
					res.status(200).json({
						error: false,
						message: "Connexion réussit",
						user,
					});
				} else {
					res.status(200).json({ message: "Password incorrect" });
				}
			});
		}
	} catch (err) {
		res.status(400).json(err);
	}
};

const logOutUser = async (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect('/login')
};

module.exports = {
	register: addUser,
	login: loginUser,
	logout: logOutUser,
};