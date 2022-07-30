"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Piece extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Piece.init(
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
				validate:{
					len:{
						args:[2,50],
						msg:"Invalid length"
					}
				}
			},
			cover: {
				type: DataTypes.STRING,
				allowNull: false,
				validate:{
					len:{
						args:[2,255],
						msg:"Invalid length"
					}
				}
			},
		},
		{
			sequelize,
			modelName: "Piece",
			timestamps: true,
			createdAt: true,
		}
	);
	return Piece;
};