const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController')

// router.get('/load-recipe', async function(req, res, next) {
//   const dbQuery = "SELECT * FROM app_user";
//   const loadUserData = await new Promise((resolve, reject) => {
//     global.db.all(dbQuery, function (err, userData) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(userData);
//       }
//     });
//   })

//   if (loadUserData !== null && loadUserData !== undefined && loadUserData !== '') {
//     //user data exist
//     console.log(loadUserData);
//     res.render('test-page', {loadUserData: loadUserData});
//   } else {
//     //user data not exist
//     res.render('test-page', { loadUserData: 'no user data' });
//   }
// });

router.get('/delete-recipe', async function(req, res, next) {
  const deleteAllData = await new Promise ((resolve, reject) => {
    const dbQuery = "DELETE FROM app_user;";

    global.db.run(dbQuery, function (err) {
      if (err) {
        reject("Error deleting data: ", err);
      } else {
        resolve("All data deleted.");
      }
    });
  });

  if (deleteAllData !== null && deleteAllData !== undefined && deleteAllData !== '') {
    //user data successfully deleted
    console.log(deleteAllData);
    res.redirect('/test');
  }
});


function random4Digit() {
  return Math.floor(1000 + Math.random() * 9000);
}

router.get('/save-recipe', async function(req, res, next) {
  const fullname = "fullname"+random4Digit();
  const email = "email"+random4Digit();
  const password = "pass"+random4Digit();
  const signup_datetime = "date"+random4Digit();
  const last_login = "date"+random4Digit();
  const profile_picture = "pic"+random4Digit();

  const userData = [fullname, email, password, signup_datetime, last_login, profile_picture];
  const createNewUserData = await new Promise((resolve, reject) => {
    const dbQuery = "INSERT INTO app_user ('fullname', 'email', 'password', 'signup_datetime', 'last_login', 'profile_picture') VALUES( ?, ?, ?, ?, ?, ?);";

    global.db.run(dbQuery, userData, function (err) {
      if (err) {
        reject('Fail to save user data.');
      } else {
        resolve('User data has been saved');
      }
    });
  });

  if (createNewUserData !== null && createNewUserData !== undefined && createNewUserData !== '') {
    //user data successfully saved
    console.log(createNewUserData);
    res.redirect('/test');
  } else {
    //fail to save user data
    console.log('Fail to save user data.');
  }

});

module.exports = router;
