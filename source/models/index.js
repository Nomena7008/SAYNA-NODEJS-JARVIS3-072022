const {DB_HOST,DB_USER,DB_PASSWORD,DB,DB_DIALECT} = process.env;

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_DIALECT,
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connected");
	})
	.catch((err) => {
		console.log("Error: " + err);
	});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.pieces = require("./pieceModel.js")(sequelize, DataTypes);
db.objects = require("./objectModel.js")(sequelize, DataTypes);

db.sequelize
	.sync({ force: false })
	.then(() => {
		console.log("DB Re-Sync: done!");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = db;