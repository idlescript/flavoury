var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.get('/save-user', userController.saveUser);  //for testing only!

router.get('/get-user/:userId', userController.getUser);

router.post('/save-user', userController.saveUser);
router.post('/edit-user', userController.editUser);

module.exports = router;
