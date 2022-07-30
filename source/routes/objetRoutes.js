const objectController = require("../Controllers/objectController");

const router = require("express").Router();

router.route("/").get(objectController.list).post(objectController.add);
router
	.route("/:id")
	.put(objectController.update)
	.post(objectController.delete)

	.get(objectController.getById);
module.exports = router;