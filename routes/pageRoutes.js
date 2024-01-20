const express = require('express');
const router = express.Router();


// route to test page
router.get('/test', function(req, res, next) {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, userData) {
    if (err) {
      console.error(err);
    } else {
      res.render('test-page', { loadUserData: userData });
    }
  });
});


//route to homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
