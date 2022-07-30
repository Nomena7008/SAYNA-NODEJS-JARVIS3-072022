"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const {JWTSECRET,HOST_URL} = process.env;
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			firstname: {
				type: DataTypes.STRING(25),
				allowNull: false,
				validate: {
					len: {
						args: [2, 25],
						msg: "Longeur Invalide",
					},
				},
			},
			lastname: {
				type: DataTypes.STRING(25),
				allowNull: false,
				validate: {
					len: {
						args: [2, 25],
						msg: "Longeur Invalide",
					},
				},
			},
			email: {
				type: DataTypes.STRING(150),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			token: {
				type: DataTypes.STRING,
			},
			date_naissance: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			role: {
				type: DataTypes.ENUM("Tuteur", "Enfant", "Admin"),
				defaultValue: "Tuteur",
				allowNull: false,
			},
			sexe: {
				type: DataTypes.ENUM("Femme", "Homme"),
				defaultValue: "Femme",
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User",
			timestamps: true,
			createdAt: true,
			hooks: {
				beforeCreate : (user, options) => {
					user.token = jwt.sign(
						{
							iss:HOST_URL,
							id:user.id,
							email:user.email,
							role:user.role
						},
						JWTSECRET
					);
				},
			},
		}
	);
	return User;
};