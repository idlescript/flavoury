const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController')

//route to homepage
router.get('/', pageController.loadHomepage);

//route to other pages
router.get('/login', pageController.loadLogin);
router.get('/signup', pageController.loadSignup);
router.get('/personal-cookbook', pageController.loadPersonalCookbook);
router.get('/personal-recipe/:recipeId', pageController.loadPersonalRecipe);
router.get('/public-cookbook', pageController.loadPublicCookbook);
router.get('/public-recipe/:recipeId', pageController.loadPublicRecipe);
router.get('/edit-recipe/:recipeId?', pageController.loadEditRecipe);
router.get('/settings', pageController.loadSettings);
router.get('/search-recipe', pageController.loadSearchRecipe);

module.exports = router;
