const userController = require('./userController');
const { uploadRecipeImage } = require('../app');
const multer  = require('multer');

function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}

const getFolderIdFromRecipeId = async (recipeId) => {
  const dbQuery = "SELECT recipe_folder_id FROM recipe WHERE id=?"
  return new Promise ((resolve, reject)=> global.db.get(dbQuery, [recipeId], function(err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      if (result) {
        resolve(result.id);
      }
      else {
        resolve();
      }
    }
  }));
}

const createRecipeFolder = async (req, res, next) => {
  const app_user_id = req.session.userId;
  const folder_name = req.body.folderName;
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
  const app_user_id = req.session.userId;
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

const saveOrEditRecipe = async (req, res, next) => {
  // If user session not exist, redirect to login page
  if (!req.session.userId) {
    res.redirect('/login');
    return;
  }

  const recipeId = req.body.recipeId;

  if (!recipeId){
    // No recipeId, save new recipe
    await saveRecipe (req, res, next);
  } else {
    // has recipeId, update recipe
    await editRecipe (req, res, next);
  }
}

const saveRecipe = async (req, res, next) => {
  // If user session not exist, redirect to login page
  if (!req.session.userId) {
    res.redirect('/login');
    return;
  }

  const app_user_id = req.session.userId;
  const recipe_folder_id = req.session.folderId;
  const recipe_title = req.body.title;
  const share_to_public = req.body.sharing;
  const servings_amount = req.body.servings;
  const prep_time = req.body.prepTime;
  const cook_time = req.body.cookTime;
  const recipe_note = req.body.recipeNote;

  const unsorted_ingredient = req.body.ingredient;
  const unsorted_instruction = req.body.instruction;

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


  console.log('saveRecipe end');

  return new Promise ((resolve, reject) => global.db.run(dbQueryRecipe, update_values, function (err) {
    if (err) {
      console.log(err);
      reject(`Error saving data: ${err}`);
    } else {
      console.log('above resolve, resolve: '+resolve);
      resolve(this.lastID);
      res.redirect('/personal-cookbook');
    }
  }));
}

const getAllRecipe = async(req, res, next) => {
  const update_values = [req.session.userId];
  const dbQuery = "SELECT * FROM recipe WHERE app_user_id = ?;"
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

const getRecipeByRecipeId = async(recipeId, req, res) => {
  // If user session not exist, redirect to login page

  console.log('getRecipeByRecipeId, req.session.userid: '+req.session.userId);

  if (!req.session.userId) {
    res.redirect('/login');
    return;
  }


  const update_values = [req.session.userId, recipeId];
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
  if (unsorted_ingredient) {
    unsorted_ingredient.forEach((item) => {
      if (item.trim()) {
        ingredient.push(item);
      }
    })
  }

  // remove empty string in the array
  if (unsorted_instruction) {
    unsorted_instruction.forEach((item) => {
      if (item.trim()) {
        instruction.push(item);
      }
    })
  }

  ingredient = JSON.stringify(ingredient);
  instruction = JSON.stringify(instruction);

  const update_values = [recipe_title, share_to_public, servings_amount, prep_time, cook_time, ingredient, instruction, recipe_note, recipe_id];

  const dbQuery = "UPDATE recipe SET recipe_title=?, share_to_public=?, servings_amount=?, prep_time=?, cook_time=?, ingredient=?, instruction=?, recipe_note=? WHERE id=?;"
  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      resolve(this.lastID);
      res.redirect('/personal-cookbook');
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
}

const uploadImage = async (req, res, next) => {
  // If user session not exist, redirect to login page
  if (!req.session.userId) {
    res.redirect('/login');
    return;
  }

  const userId = req.session.userId;
  console.log('inside app.post()');
  console.log('req.session: '+typeof req.session);
  console.log('req.session.userId: '+ userId);

  uploadRecipeImage(req, res, function(err) { 
    if (err instanceof multer.MulterError) {
      // Multer error occurred when uploading
      return res.status(400).json({ error: 'Error uploading file' });
    } else if (err) {
      // Unknown error occurred when uploading
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log(`req.file: ${JSON.stringify(req.file)}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    // return res.status(200).json({ message: 'File uploaded successfully' });
    res.redirect('/personal-cookbook');
  })
};


module.exports = {
  getFolderIdFromRecipeId,
  createRecipeFolder,
  getAllRecipeFolder,
  getRecipeFolder,
  editRecipeFolder,
  deleteAllRecipeFolder,
  deleteRecipeFolder,
  saveOrEditRecipe,
  saveRecipe,
  getAllRecipe,
  getRecipeByRecipeId,
  editRecipe,
  deleteAllRecipe,
  deleteRecipe,
  searchRecipe,
  uploadImage
}