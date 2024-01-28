var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.get('/save-user', userController.saveUser);  //for testing only!

router.post('/save-user', userController.saveUser);
router.post('/edit-user', userController.editUser);
router.post('/delete-user', userController.deleteUser);

router.post('/login-check', userController.loginCheck);

module.exports = router;
