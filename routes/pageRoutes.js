const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController')

// for testing only -----
router.get('/test/:userId?', pageController.loadTestPage);
router.get('/insert-dummy-data', pageController.insertDummyData);
router.get('/delete-all-data', pageController.deleteAllData);
// end of for testing only -----


//route to homepage
router.get('/', pageController.loadHomepage);

//route to other pages
router.get('/login', pageController.loadLogin);
router.get('/signup', pageController.loadSignup);
router.get('/personal-cookbook', pageController.loadPersonalCookbook);
router.get('/personal-recipe/:recipeId?', pageController.loadPersonalRecipe);
router.get('/public-cookbook', pageController.loadPublicCookbook);
router.get('/public-recipe/:recipeId?', pageController.loadPublicRecipe);
router.get('/edit-recipe/:recipeId?', pageController.loadEditRecipe);
router.get('/settings', pageController.loadSettings);

module.exports = router;
