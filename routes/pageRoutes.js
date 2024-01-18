const express = require('express');
const router = express.Router();

//route to test page
router.get('/test', async function(req, res, next) {
  const dbQuery = "SELECT * FROM app_user";
  const loadUserData = await new Promise((resolve, reject) => {
    global.db.all(dbQuery, function (err, userData) {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  })

  if (loadUserData !== null && loadUserData !== undefined && loadUserData !== '') {
    //user data exist
    res.render('test-page', {loadUserData: loadUserData});
  } else {
    //user data not exist
    res.render('test-page', { loadUserData: 'no user data' });
  }
});

//route to homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
