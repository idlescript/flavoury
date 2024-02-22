const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController')


router.post('/save-recipe', recipeController.saveRecipe);
router.post('/edit-recipe', recipeController.editRecipe);
router.post('/delete-recipe', recipeController.deleteRecipe);
router.post('/get-recipe', recipeController.getRecipe);

router.post('/create-recipe-folder', recipeController.createRecipeFolder);
router.post('/edit-recipe-folder', recipeController.editRecipeFolder);
router.post('/delete-recipe-folder', recipeController.deleteRecipeFolder);
router.post('/get-recipe-folder', recipeController.getRecipeFolder);

router.post('/search-recipe', recipeController.searchRecipe);

// router.post('/upload-image', recipeController.uploadImage);

module.exports = router;
