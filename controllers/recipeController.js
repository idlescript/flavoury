
function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}

//insert user data, recipe_folder data, recipe data for testing
const insertDummyData = (req, res, next) => {

  const fullname = "fullname"+randomDigit(4);
  const email = "email"+randomDigit(4);
  const password = "password"+randomDigit(4);
  const profile_picture = "profilepic"+randomDigit(4);

  const update_values = [fullname, email, password, profile_picture];
  const dbQuery = "INSERT INTO app_user ('fullname', 'email', 'password', 'profile_picture') VALUES( ?, ?, ?, ?);";

  global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      console.error(`Error saving data: ${err}`);
    } else {
      const app_user_id = this.lastID;
      const folder_name = "folder name"+randomDigit(4);
      const update_values2 = [app_user_id, folder_name];
      const dbQuery2 = "INSERT INTO recipe_folder ('app_user_id', 'folder_name') VALUES( ?, ? );";
    
      global.db.run(dbQuery2, update_values2, function (err2) {
        if (err) {
          console.error(`Error saving data: ${err2}`);
        } else {
          const folder_id = this.lastID;
          const recipe_title = "recipe title "+randomDigit(4);
          const share_to_public = 0;
          const servings_amount = randomDigit(1);
          const prep_time = randomDigit(3);
          const cook_time = randomDigit(3);
    
          const update_values3 = [app_user_id, folder_id, recipe_title, share_to_public, servings_amount, prep_time, cook_time];
          const dbQuery3 = "INSERT INTO recipe ('app_user_id', 'recipe_folder_id', 'recipe_title', 'share_to_public', 'servings_amount', 'prep_time', 'cook_time')\
                            VALUES( ?, ?, ?, ?, ?, ?, ? );";
        
          global.db.run(dbQuery3, update_values3, function (err3) {
            if (err) {
              console.error(`Error saving data: ${err3}`);
            } else {
              res.redirect('/test');
            }
          });
        }
      });
    }
  });
};

const deleteDummyData = (req, res, next) => {

  const dbQuery = "DELETE FROM recipe;";
  global.db.run(dbQuery, function (err) {
    if (err) {
      console.error(`Error deleting data: ${err}`);
    } else {

      const dbQuery2 = "DELETE FROM recipe_folder;";
      global.db.run(dbQuery2, function (err2) {
        if (err2) {
          console.error(`Error deleting data: ${err2}`);
        } else {

          const dbQuery3 = "DELETE FROM app_user;";
          global.db.run(dbQuery3, function (err3) {
            if (err3) {
              console.error(`Error deleting data: ${err3}`);
            } else {
              res.redirect('/test');
            }
          });
        }
      });
    }
  });
};



const createRecipeFolder = (req, res, next) => {
  const app_user_id = req.params.id;
  const folder_name = "folder"+randomDigit(4);
  const update_values = [app_user_id, folder_name];
  const dbQuery = "INSERT INTO recipe_folder ('app_user_id', 'folder_name') VALUES( ?, ? );";

  global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      console.error(`Error saving data: ${err}`);
    } else {
      res.redirect('/test');
    }
  });
};

const deleteRecipeFolder = (req, res, next) => {
  const dbQuery = "DELETE FROM recipe_folder;";

  global.db.run(dbQuery, function (err) {
    if (err) {
      console.error(`Error deleting data: ${err}`);
    } else {
      res.redirect('/test');
    }
  });
};

const saveRecipe = (req, res, next) => {
  const recipe_title = "recipe title "+randomDigit(4);
  const share_to_public = 0;
  const servings_amount = randomDigit(1);
  const prep_time = randomDigit(3);
  const cook_time = randomDigit(3);

  const update_values = [recipe_title, share_to_public, servings_amount, prep_time, cook_time];
  const dbQuery = "INSERT INTO recipe ('recipe_title', 'share_to_public', 'servings_amount', 'prep_time', 'cook_time') VALUES( ?, ?, ?, ?, ? );";

  global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      console.error(`Error saving data: ${err}`);
    } else {
      res.redirect('/test');
    }
  });
};

const deleteRecipe = (req, res, next) => {
  const dbQuery = "DELETE FROM recipe;";

  global.db.run(dbQuery, function (err) {
    if (err) {
      console.error(`Error deleting data: ${err}`);
    } else {
      res.redirect('/test');
    }
  });
};

module.exports = {
  insertDummyData,
  deleteDummyData,
  createRecipeFolder,
  deleteRecipeFolder,
  saveRecipe,
  deleteRecipe  
}