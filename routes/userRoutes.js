var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.post('/save-user', userController.saveUser);
router.post('/edit-user', userController.editUser);
router.post('/delete-user', userController.deleteUser);

router.post('/login-check', userController.loginCheck);
router.post('/logout', userController.logoutUser);

router.post('/save-screen-mode', userController.saveScreenMode);

module.exports = router;
