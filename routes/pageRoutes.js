const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController')
const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')


// for testing only -----
router.get('/test', pageController.loadTestPage);
router.get('/insert-dummy-data/:id', recipeController.insertDummyData);
router.get('/delete-dummy-data', recipeController.deleteDummyData);
// end of for testing only -----



//route to homepage
router.get('/', pageController.loadHomepage);

//route to other pages
router.get('/personal-cookbook', pageController.loadPersonalCookbook);
router.get('/personal-recipe', pageController.loadPersonalRecipe);
router.get('/public-cookbook', pageController.loadPublicCookbook);
router.get('/public-recipe', pageController.loadPublicRecipe);
router.get('/edit-recipe', pageController.loadEditRecipe);
router.get('/settings', pageController.loadSettings);




// ----Recipes----

router.get('/delete-recipe', recipeController.deleteRecipe);

router.get('/create-recipe-folder', function(req, res, next) {
  const app_user_id = req.query.id;
  const folder_name = "folder"+randomDigit(4);
  const userData = [app_user_id, folder_name];
  const dbQuery = "INSERT INTO recipe_folder ('app_user_id', 'folder_name') VALUES( ?, ? );";

  global.db.run(dbQuery, userData, function (err) {
    if (err) {
      console.error(`Error saving data: ${err}`);
    } else {
      res.redirect('/test');
    }
  });
});

router.get('/save-recipe', recipeController.saveRecipe);



// ----Users----

router.get('/delete-user', userController.deleteUser);
router.get('/save-user', userController.saveUser);



module.exports = router;
