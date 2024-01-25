const userController = require('./userController')
const recipeController = require('./recipeController')


//insert user data, recipe_folder data, recipe data for testing
const insertDummyData = async (req, res, next) => {
  try {
    const test1 = await userController.saveUser(req, res, next);
    if (test1) {
      const user_id = test1;
      req.body = { ...req.body, userId: user_id };
    }

    const test2 = await recipeController.createRecipeFolder(req, res, next);
    if (test2) {
      const folder_id = test2;
      req.body = { ...req.body, folderId: folder_id };
    }

    const test3 = await recipeController.saveRecipe(req, res, next);

    res.redirect('/test');
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const deleteAllData = async (req, res, next) => {  // Testing usage only
  try {
    const delete1 = await recipeController.deleteAllRecipe(req, res, next);
    const delete2 = await recipeController.deleteRecipeFolder(req, res, next);
    const delete3 = await userController.deleteUser(req, res, next);

    console.log(`delete1+delete2+delete3: ${delete1}+${delete2}+${delete3}`)

    res.redirect('/test');
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};


const loadTestPage = async (req, res, next) => {
  try {
    console.log("loadTestPage : ");
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('test-page', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};


const loadHomepage = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('index', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPersonalCookbook = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('personalCookbook', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPersonalRecipe = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('personalRecipe', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPublicCookbook = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('publicCookbook', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPublicRecipe = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('publicRecipe', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadEditRecipe = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('editRecipe', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadSettings = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getRecipe(req, res, next);

    res.render('settings', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};



module.exports = {
  insertDummyData,
  deleteAllData,
  loadTestPage,
  loadHomepage,
  loadPersonalCookbook,
  loadPersonalRecipe,
  loadPublicCookbook,
  loadPublicRecipe,
  loadEditRecipe,
  loadSettings
}