"use strict";
const { Model } = require("sequelize");

/**
 * @swagger
 * definitions:
 *   Object:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       age:
 *         type: integer
 *       status:
 *         type: string
 */
module.exports = (sequelize, DataTypes) => {
	class Object extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Object.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					len: {
						args: [2, 50],
						msg: "Longeur Invalide",
					},
				},
			},
			type: {
				type: DataTypes.ENUM("Prise", "Lumiere"),
				defaultValue: "Lumiere",
				allowNull: false,
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Object",
			timestamps:true,
			createdAt:true
		}
	);
	return Object;
};