const docsController = require('../Controllers/docsController')

const router = require('express').Router();
router.get('',docsController.indexView)
router.get('/login',docsController.loginView)
router.get('/register',docsController.registerView)
module.exports = router;