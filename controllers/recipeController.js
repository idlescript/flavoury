const userController = require('./userController')

function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}

const createRecipeFolder = async (req, res, next) => {
  const app_user_id = (req && req.body.userId) ? req.body.userId : req.body.id;
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
}

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
  const app_user_id = req.body.userId;
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

const editRecipeFolder = async(req, res, next) => {
  const app_user_id = req.body.userId;
  const recipe_folder_id = req.body.folderId;
  const folder_name = req.body.folderName;
  const update_values = [folder_name, recipe_folder_id, app_user_id];

  const dbQuery = "UPDATE recipe_folder SET folder_name=? WHERE id=? AND app_user_id=?;"
  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      const rowsAffected = this.changes; // return number of rows changed
      resolve(rowsAffected);
    }
  }));
}

const deleteAllRecipeFolder = async (req, res, next) => { //for testing usage only
  const dbQuery = "DELETE FROM recipe_folder;";
  return new Promise ((resolve, reject) => global.db.run(dbQuery, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
}

const deleteRecipeFolder = async (req, res, next) => {
  const recipe_folder_id = req.params.folderId;
  const app_user_id = req.params.userId;
  const update_values = [recipe_folder_id, app_user_id];
  const dbQuery = "DELETE FROM recipe_folder WHERE id=? AND app_user_id=?;";

  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
}

const saveRecipe = async (req, res, next) => {
  const app_user_id = req.body.userId;
  const recipe_folder_id = req.body.folderId;
  const recipe_title = (req && req.body.title) ? req.body.title : "recipe title "+randomDigit(4);
  const share_to_public = (req && req.body.sharing) ? req.body.sharing : 0;
  const servings_amount = (req && req.body.servings) ? req.body.servings : randomDigit(1);
  const prep_time = (req && req.body.prepTime) ? req.body.prepTime : randomDigit(3);
  const cook_time = (req && req.body.cookTime) ? req.body.cookTime : randomDigit(3);
  const recipe_note = (req && req.body.recipeNote) ? req.body.recipeNote : "blahblah "+randomDigit(6);

  const unsorted_ingredient = (req && req.body.ingredient) ? req.body.ingredient
                      : ["ingredient"+randomDigit(3), "ingredient"+randomDigit(3), "   ", "ingredient"+randomDigit(3)];
  const unsorted_instruction = (req && req.body.instruction) ? req.body.instruction
                      : ["instruction"+randomDigit(6), "instruction"+randomDigit(6), "   ", "instruction"+randomDigit(6)];

  let ingredient = [];
  let instruction = [];

  // remove empty string in the array
  unsorted_ingredient.forEach((item) => {
    if (item.trim()) {
      ingredient.push(item);
    }
  })

  // remove empty string in the array
  unsorted_instruction.forEach((item) => {
    if (item.trim()) {
      instruction.push(item);
    }
  })

  ingredient = JSON.stringify(ingredient);
  instruction = JSON.stringify(instruction);

  const update_values = [app_user_id, recipe_folder_id, recipe_title, share_to_public, servings_amount, prep_time, cook_time, ingredient, instruction, recipe_note];
  const dbQueryRecipe = "INSERT INTO recipe \
                          ('app_user_id', 'recipe_folder_id', 'recipe_title',\
                          'share_to_public', 'servings_amount', 'prep_time',\
                          'cook_time', 'ingredient', 'instruction', 'recipe_note')\
                          VALUES\
                          ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );";

  return new Promise ((resolve, reject) => global.db.run(dbQueryRecipe, update_values, function (err) {
    if (err) {
      reject(`Error saving data: ${err}`);
    } else {
      resolve(this.lastID);
    }
  }));
}

const getAllRecipe = async(req, res, next) => {  //for testing usage only
  const dbQuery = "SELECT * FROM recipe;"
  return new Promise ((resolve, reject) => global.db.all(dbQuery, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      result.forEach(arr => {
        arr.ingredient = JSON.parse(arr.ingredient);
        arr.instruction = JSON.parse(arr.instruction);
      })
      resolve(result);
    }
  }));
}

const getRecipe = async(req, res, next) => {
  const app_user_id = req.params.userId ? req.params.userId : 1;
  const recipe_id = req.params.userId ? req.params.recipeId : 1;
  const update_values = [app_user_id, recipe_id];

  const dbQuery = "SELECT * FROM recipe WHERE app_user_id=? AND id=?;"
  return new Promise ((resolve, reject) => global.db.all(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      result.forEach(arr => {
        arr.ingredient = JSON.parse(arr.ingredient);
        arr.instruction = JSON.parse(arr.instruction);
      })
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
  const recipe_note = req.body.recipeNote;

  const unsorted_ingredient = req.body.ingredient
  const unsorted_instruction = req.body.instruction

  let ingredient = [];
  let instruction = [];

  // remove empty string in the array
  unsorted_ingredient.forEach((item) => {
    if (item.trim()) {
      ingredient.push(item);
    }
  })

  // remove empty string in the array
  unsorted_instruction.forEach((item) => {
    if (item.trim()) {
      instruction.push(item);
    }
  })

  ingredient = JSON.stringify(ingredient);
  instruction = JSON.stringify(instruction);

  const update_values = [recipe_title, share_to_public, servings_amount, prep_time, cook_time, ingredient, instruction, recipe_note, recipe_id];

  const dbQuery = "UPDATE recipe SET recipe_title=?, share_to_public=?, servings_amount=?, prep_time=?, cook_time=?, ingredient=?, instruction=?, recipe_note=? WHERE id=?;"
  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      resolve(this.lastID);
    }
  }));
}

const deleteAllRecipe = async (req, res, next) => { //testing usage only
  const dbQuery = "DELETE FROM recipe;";
  return new Promise ((resolve, reject) => global.db.run(dbQuery, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
}

const deleteRecipe = async (req, res, next) => {
  const recipe_id = req.body.recipeId;
  const update_values = [recipe_id];
  const dbQuery = "DELETE FROM recipe WHERE id=?;";

  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
}

const searchRecipe = async (req, res, next) => {
  const searchType = req.body.searchType;
  const searchQuery = `%${req.body.searchQuery}%`;

  const update_values = [searchQuery];
  let dbQuery;

  if (searchType==="public") {
    // search public recipe
    dbQuery = "SELECT * FROM recipe WHERE recipe_title LIKE ? AND NOT share_to_public='0'";
  } else {
    // search personal recipe
    dbQuery = "SELECT * FROM recipe WHERE recipe_title LIKE ? AND share_to_public='0'";
  }

  return new Promise ((resolve, reject) => global.db.all(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error querying data: ${err}`);
    } else {
      resolve(result);
    }
  }));
};

module.exports = {
  createRecipeFolder,
  getAllRecipeFolder,
  getRecipeFolder,
  editRecipeFolder,
  deleteAllRecipeFolder,
  deleteRecipeFolder,
  saveRecipe,
  getAllRecipe,
  getRecipe,
  editRecipe,
  deleteAllRecipe,
  deleteRecipe,
  searchRecipe
}