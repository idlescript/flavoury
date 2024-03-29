const recipeController = require('./recipeController');
const bcrypt = require("bcryptjs");


const errorRedirectMsg = (message) => {
    return `<p>${message}</p>
            <a href="/">Go Home</a>`;
};

const getPasswordByEmail = async (email) => {
  const dbQuery = "SELECT password FROM app_user WHERE email=?;";
  return new Promise ((resolve, reject)=> global.db.get(dbQuery, [email], function(err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      if (result) {
        resolve(result.password);
      }
      resolve();
    }
  }));
}

const getUserIdByEmail = async (email) => {
  const dbQuery = "SELECT id FROM app_user WHERE email=?;";
  return new Promise ((resolve, reject)=> global.db.get(dbQuery, [email], function(err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      if (result) {
        resolve(result.id);
      }
      resolve();
    }
  }));
}


const saveUser = async (req, res, next) => {
  const fullname = req.body.fullname;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 8)
  const profile_picture = '';
  const dark_mode = 0;

  req.body = { ...req.body, folderName: '_root' };

  const update_values = [fullname, email, hashedPassword, profile_picture, dark_mode];
  const dbQuery = "INSERT INTO app_user ('fullname', 'email', 'password', 'profile_picture', 'dark_mode') VALUES( ?, ?, ?, ?, ?);";

  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, async function (err) {
    if (err) {
      reject(`Error saving data: ${err}`);
    } else {
      resolve(this.lastID);
      req.session.userId = this.lastID;

      const recipeFolderId = await recipeController.createRecipeFolder(req, res, next);
      req.session.folderId = recipeFolderId;
      res.redirect('/personal-cookbook');
    }
  }));
}

const getAllUser = async(req, res, next) => { //testing usage only
  const dbQuery = "SELECT * FROM app_user;"
  return new Promise ((resolve, reject) => global.db.all(dbQuery, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      resolve(result);
    }
  }));
}

const getUser = async(req, res, next) => {
  const userId = req.session.userId;
  const update_values = [userId];
  const dbQuery = "SELECT * FROM app_user WHERE id = ?;"
  return new Promise ((resolve, reject) => global.db.get(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      if (!result) {
        reject(`No user found for ID: ${userId}`);
      } else {
        resolve(result);
      }
    }
  }));
}

const editUser = async(req, res, next) => {
  const userId = req.body.userId;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const update_values = [fullname, email, password, userId];

  const dbQuery = "UPDATE app_user SET fullname=?, email=?, password=? WHERE id=?;"
  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      const rowsAffected = this.changes; // return number of rows changed
      resolve(rowsAffected);
    }
  }));
}

const deleteAllUser = async (req, res, next) => { // for testing usage only
  const dbQuery = "DELETE FROM app_user;";
  return new Promise ((resolve, reject) => global.db.run(dbQuery, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
}

const deleteUser = async (req, res, next) => {
  const app_user_id = req.body.userId;
  const update_values = [app_user_id];

  const dbQuery = "DELETE FROM app_user WHERE id=?;";
  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
}

const loginCheck = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const dbPassword = await getPasswordByEmail(email);
  if (dbPassword===undefined) {
    res.send(errorRedirectMsg("User doesn't exist"));
  }

  const userId = await getUserIdByEmail(email);

  bcrypt.compare(password, dbPassword, async (err, result) => {
    if (err) {
        console.error(err);
    } else {
      if (result) {
        req.session.userId = userId;
        const recipeFolder = await recipeController.getRecipeFolder(req, res);

        req.session.folderId = recipeFolder[0].id;
        res.redirect('/personal-cookbook');
      } else {
        res.send(errorRedirectMsg('Password is wrong'));
      }
    }
  });
}

const logoutUser = async (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};

const loadScreenMode = async (req, res, next) => {
  // If user session not exist, redirect to login page
  if (!req.session.userId) {
    res.redirect('/login');
    return;
  }

  const update_values = [req.session.userId];
  const dbQuery = "SELECT dark_mode FROM app_user WHERE id = ?;"
  return new Promise ((resolve, reject) => global.db.get(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error getting data: ${err}`);
    } else {
      if (!result) {
        reject(`No user found for ID: ${userId}`);
      } else {
        resolve(result);
      }
    }
  }));
};

const saveScreenMode = async (req, res, next) => {
  const screen_mode = req.body.screenMode;
  const userId = req.session.userId
  const update_values = [screen_mode, userId];
  const dbQuery = "UPDATE app_user SET dark_mode=? WHERE id=?;"
  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      res.redirect('/settings');
    }
  }));
};

module.exports = {
  saveUser,
  getAllUser,
  getUser,
  editUser,
  deleteAllUser,
  deleteUser,
  loginCheck,
  logoutUser,
  loadScreenMode,
  saveScreenMode,
}