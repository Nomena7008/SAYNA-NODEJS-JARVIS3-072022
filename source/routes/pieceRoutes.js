const pieceController = require("../Controllers/pieceController");

const router = require("express").Router();

router.route("/").get(pieceController.list).post(pieceController.add);

router
	.route("/:id")
	.put(pieceController.update)
	.post(pieceController.delete)
	.get(pieceController.getById);
module.exports = router;