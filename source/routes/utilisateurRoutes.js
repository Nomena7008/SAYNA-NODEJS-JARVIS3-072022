const userController = require("../Controllers/userController");

const router = require("express").Router();

router.get("/", userController.list);
router.route('/:id')
	.put(userController.update)
	.post(userController.delete)
	.get(userController.getById);
module.exports = router;