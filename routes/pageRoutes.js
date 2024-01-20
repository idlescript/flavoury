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

//this whole thing is a bit messy and not quite right, but it's the closest I can figure out to how it's supposed to be :/

// //route to personal cookbook page
// router.get('/personalCookbook', async function(req, res, next) {
//   //retrieve cookbook folder names
//   const dbQuery = "SELECT id, folder_name FROM recipe_folder WHERE app_user_id = (SELECT id FROM app_user)"; //retrieves folders based on the user_id 
//   const loadCookbookData = await new Promise((resolve, reject) => {
//     global.db.all(dbQuery, function (err, cookbookData) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(cookbookData);
//       }
//     });
//   })
//   //retrieve recipe data
//   const dbQuery2 = "SELECT recipe_folder_id, recipe_title, photo FROM recipe WHERE app_user_id = (SELECT id FROM app_user)"; 
//   const loadRecipeData = await new Promise((resolve, reject) => {
//     global.db.all(dbQuery, function (err, recipeData) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(recipeData);
//       }
//     });
//   })
//   res.render('personalCookbook', {loadCookbookData: cookbookData, loadRecipeData: recipeData});
// });


module.exports = router;
