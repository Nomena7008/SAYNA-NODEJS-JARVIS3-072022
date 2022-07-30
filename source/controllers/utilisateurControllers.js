const { compare } = require("bcryptjs");
const db = require("../Models");
const parseError = require("../Utilities/parseError");
const User = db.users;

const getAlluser = async (req, res) => {
	let users = await User.findAll({
		attributes: [
			"id",
			"firstname",
			"lastname",
			"date_naissance",
			"sexe",
			"email",
			"role",
		],
	});
	console.log(req)
	res.status(200).send(users);
};

const getById = async (req, res) => {
	let id = req.params.id;
	let user = await User.findOne({
		where: { id: id },
	});
	res.status(200).send(user);
};
const updateUser = async (req, res) => {
	let id = req.params.id;
	let user = await User.update(req.body, {
		where: { id: id },
	});
	res.status(200).send(user);
};
const deleteUser = async (req, res) => {
	let id = req.params.id;
	await User.destroy({
		where: { id: id },
	});
	res.status(200).send(`User with id=${id} is deleted`);
};

module.exports = {
	list: getAlluser,
	delete: deleteUser,
	update: updateUser,
	getById: getById,
};