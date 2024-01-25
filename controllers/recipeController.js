const userController = require('./userController')

function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}


const createRecipeFolder = async (req, res, next) => {
  const app_user_id = (req && req.body && req.body.userId) ? req.body.userId : req.body.id;
  const folder_name = (req && req.body.folderName) ? req.body.folderName : "folder"+randomDigit(4);
  const update_values = [app_user_id, folder_name];
  const dbQuery = "INSERT INTO recipe_folder ('app_user_id', 'folder_name') VALUES( ?, ? );";

  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error saving data: ${err}`);
    } else {
      resolve(this.lastID);
    }
  }));
};

const getAllRecipeFolder = async(req, res, next) => { //for testing usage only
  const dbQuery = "SELECT * FROM recipe_folder;"
  return new Promise ((resolve, reject) => global.db.all(dbQuery, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      resolve(result);
    }
  }));
}

const getRecipeFolder = async(req, res, next) => {
  const app_user_id = req.params.userId;
  const update_values = [app_user_id];
  const dbQuery = "SELECT * FROM recipe_folder WHERE app_user_id=?;"
  return new Promise ((resolve, reject) => global.db.all(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      resolve(result);
    }
  }));
}

const deleteRecipeFolder = async (req, res, next) => {
  const dbQuery = "DELETE FROM recipe_folder;";

  await new Promise ((resolve, reject) => global.db.run(dbQuery, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
};


const saveRecipe = async (req, res, next) => {
  const app_user_id = (req && req.body && req.body.userId) ? req.body.userId : 999;
  const recipe_folder_id = (req && req.body && req.body.folderId) ? req.body.folderId : 999;
  const recipe_title = (req && req.body.title) ? req.body.title : "recipe title "+randomDigit(4);
  const share_to_public = (req && req.body.sharing) ? req.body.sharing : 0;
  const servings_amount = (req && req.body.servings) ? req.body.servings : randomDigit(1);
  const prep_time = (req && req.body.prepTime) ? req.body.prepTime : randomDigit(3);
  const cook_time = (req && req.body.cookTime) ? req.body.cookTime : randomDigit(3);

  const update_values = [app_user_id, recipe_folder_id, recipe_title, share_to_public, servings_amount, prep_time, cook_time];
  const dbQuery = "INSERT INTO recipe ('app_user_id', 'recipe_folder_id', 'recipe_title', 'share_to_public', 'servings_amount', 'prep_time', 'cook_time')\
                    VALUES( ?, ?, ?, ?, ?, ?, ? );";

  await new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error saving data: ${err}`);
    } else {
      resolve("Data saved!");
    }
  }));
};

const getRecipe = async(req, res, next) => {
  const dbQuery = "SELECT * FROM recipe;"
  return new Promise ((resolve, reject) => global.db.all(dbQuery, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      resolve(result);
    }
  }));
}

const editRecipe = async(req, res, next) => {
  const recipe_id = req.body.recipeId;
  const recipe_title = req.body.title;
  const share_to_public = req.body.sharing;
  const servings_amount = req.body.servings;
  const prep_time = req.body.prepTime;
  const cook_time = req.body.cookTime;
  const update_values = [recipe_title, share_to_public, servings_amount, prep_time, cook_time, recipe_id];

  const dbQuery = "UPDATE recipe SET recipe_title=?, share_to_public=?, servings_amount=?,prep_time=? ,cook_time=? WHERE id=?;"
  return new Promise ((resolve, reject) => global.db.get(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      resolve(result);
    }
  }));
}

const deleteAllRecipe = async (req, res, next) => { //testing usage only
  const dbQuery = "DELETE FROM recipe;";
  await new Promise ((resolve, reject) => global.db.run(dbQuery, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
};

const deleteRecipe = async (req, res, next) => {
  const recipe_id = req.body.recipeId;
  const update_values = [recipe_id];
  const dbQuery = "DELETE FROM recipe WHERE id=?;";

  await new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
};

module.exports = {
  createRecipeFolder,
  getAllRecipeFolder,
  getRecipeFolder,
  deleteRecipeFolder,
  saveRecipe,
  getRecipe,
  editRecipe,
  deleteAllRecipe,
  deleteRecipe  
}