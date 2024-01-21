var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.get('/save-user', userController.saveUser);  //for testing only!
router.post('/save-user', userController.saveUser);

module.exports = router;
