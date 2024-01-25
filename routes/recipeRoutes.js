const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController')

router.post('/save-recipe', recipeController.saveRecipe);
router.post('/edit-recipe', recipeController.editRecipe);
router.post('/delete-recipe', recipeController.deleteRecipe);

router.post('/create-recipe-folder', recipeController.createRecipeFolder);

module.exports = router;
