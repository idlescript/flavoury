const bcrypt = require("bcryptjs");

function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}

const getPasswordByEmail = async (email) => {
  const dbQuery = "SELECT password FROM app_user WHERE email=?;";
  return new Promise ((resolve, reject)=> global.db.get(dbQuery, [email], function(err, result) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve(result.password);
    }
  }));  
}


const saveUser = async (req, res, next) => {
  const fullname = (req && req.body.fullname) ? req.body.fullname : "fullname"+randomDigit(4);
  const email = (req && req.body.email) ? req.body.email.toLowerCase() : "email"+randomDigit(4);
  const password = (req && req.body.password) ? req.body.password : "password"+randomDigit(4);
  const hashedPassword = await bcrypt.hash(password, 8)
  const profile_picture = "profilepic"+randomDigit(4);



  const update_values = [fullname, email, hashedPassword, profile_picture];
  const dbQuery = "INSERT INTO app_user ('fullname', 'email', 'password', 'profile_picture') VALUES( ?, ?, ?, ?);";

  return new Promise ((resolve, reject) => global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      reject(`Error saving data: ${err}`);
    } else {
      resolve(this.lastID);
    }
  }));
};

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
  const userId = req.body.userId;
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
};

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
};


const loginCheck = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  console.log(`email: ${email}, password: ${password}`)
  const dbPassword = await getPasswordByEmail(email);

  console.log(`dbPassword: ${dbPassword}`)

  bcrypt.compare(password, dbPassword, (err, result) => {
    if (err) {
        console.error(err);
    } else {
      if (result) {
        console.log('Password is correct');
        res.send("Password is correct");
      } else {
        console.log('Password is incorrect');
        res.send("Password is wrong");
      }
    }
  });
}

module.exports = {
  saveUser,
  getAllUser,
  getUser,
  editUser,
  deleteAllUser,
  deleteUser,
  loginCheck
}