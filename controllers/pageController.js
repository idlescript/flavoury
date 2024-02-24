const userController = require('./userController');
const recipeController = require('./recipeController');


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
    if (test3) {
      const recipe_id = test3;
      req.body = { ...req.body, recipeId: recipe_id };
    }

    res.redirect('/test');
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const deleteAllData = async (req, res, next) => {  // Testing usage only
  try {
    const delete1 = await recipeController.deleteAllRecipe(req, res, next);
    const delete2 = await recipeController.deleteAllRecipeFolder(req, res, next);
    const delete3 = await userController.deleteAllUser(req, res, next);

    res.redirect('/test');
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};


const loadTestPage = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getAllRecipe(req, res, next);

    res.render('test-page', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData});
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};


const loadHomepage = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    else {
      res.redirect('/personal-cookbook');
    }
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadLogin = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getAllRecipe(req, res, next);

    res.render('login', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadSignup = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getAllRecipe(req, res, next);

    res.render('signup', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPersonalCookbook = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    const recipeData = await recipeController.getAllRecipe(req, res, next);

    res.render('personalCookbook', { recipeData: recipeData, userId: req.session.userId });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPersonalRecipe = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.redirect('/login');
    }

    const recipeId = req.params.recipeId;

    // If no recipeId provided as param, load all recipe (testing)
    if (!recipeId) {
      const recipeData = await recipeController.getAllRecipe(req, res, next);
      res.render('personalRecipe', { recipeData: recipeData, allRecipe: recipeData, userId: req.session.userId });
      return;
    }
    
    const recipeData = await recipeController.getPersonalRecipeByRecipeId(recipeId, req, res);
    if (recipeData != ''){
      const allRecipe = await recipeController.getAllRecipe(req, res, next);
      res.render('personalRecipe', { recipeData: recipeData, allRecipe: allRecipe, recipeId: recipeId});
    }
    else {
      res.redirect('/');
    }
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPublicCookbook = async (req, res, next) => {
  try {
    const recipeData = await recipeController.getAllRecipe(req, res, next);

    res.render('publicCookbook', { recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadPublicRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;

    // If no recipeId provided as param, load all recipe (testing)
    if (!recipeId) {
      const recipeData = await recipeController.getAllRecipe(req, res, next);
      res.render('publicRecipe', { recipeData: recipeData });
      return;
    }
    
    const recipeData = await recipeController.getPublicRecipeByRecipeId(recipeId, req, res);
    if (recipeData != ''){

      let allRecipe;

      if (req.session.userId) {
        allRecipe = await recipeController.getAllRecipe(req, res, next);
      }
      else {
        allRecipe = '';
      }

      res.render('publicRecipe', { recipeData: recipeData, allRecipe: allRecipe, recipeId: recipeId});
    }
    else {
      res.send(`<p>Recipe not exist</p>
                <a href="/search-recipe">Go Back</a>`);
    }
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadEditRecipe = async (req, res, next) => {
  try {
    // If user session not exist, redirect to login page
    if (!req.session.userId) {
      res.redirect('/login');
      return;
    }

    const recipeId = req.params.recipeId;
    let recipeData;
    if (recipeId) {
      recipeData = await recipeController.getPersonalRecipeByRecipeId(recipeId, req, res);
    } else {
      await recipeController.saveRecipe(req, res, next);
      return;
    }

    // Redirect to homepage if no recipeData and no recipeId provided
    if (recipeId && recipeData=='') {
      res.redirect('/');
      return;
    }

    req.session.recipeId = recipeId;

    res.render('editRecipe', { recipeData: recipeData, recipeId: recipeId});
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadSettings = async (req, res, next) => {
  try {
    const userData = await userController.getAllUser(req, res, next);
    const recipeFolder = await recipeController.getAllRecipeFolder(req, res, next);
    const recipeData = await recipeController.getAllRecipe(req, res, next);

    res.render('settings', { userData: userData, recipeFolder: recipeFolder, recipeData: recipeData });
  }
  catch (err) {
    console.error(`error: ${err}`);
  }
};

const loadSearchRecipe = async (req, res, next) => {
  try {
    const searchQuery = (req.query.search) ? req.query.search : '';
    const searchMode = (req.query.mode) ? req.query.mode : '';

    // return if no query or search mode provided
    if (!searchQuery) {
      const randomPublicRecipe = await recipeController.getRandomPublicRecipe(req, res, next);
      res.render('search', { searchResult: randomPublicRecipe });
      return;
    }

    req.body = { ...req.body, searchQuery: searchQuery, searchMode: searchMode };
    let searchResult = [];
    searchResult= await recipeController.searchRecipe(req, res, next);

    res.render('search', { searchQuery: searchQuery, searchMode: searchMode, searchResult: searchResult });
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
  loadLogin,
  loadSignup,
  loadPersonalCookbook,
  loadPersonalRecipe,
  loadPublicCookbook,
  loadPublicRecipe,
  loadEditRecipe,
  loadSettings,
  loadSearchRecipe
}