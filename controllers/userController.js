
function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}

const saveUser = async (req, res, next) => {
  const fullname = (req && req.body.fullname) ? req.body.fullname : "fullname"+randomDigit(4);
  const email = (req && req.body.email) ? req.body.email : "email"+randomDigit(4);
  const password = (req && req.body.password) ? req.body.password : "password"+randomDigit(4);
  const profile_picture = "profilepic"+randomDigit(4);

  const update_values = [fullname, email, password, profile_picture];
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
  return new Promise ((resolve, reject) => global.db.get(dbQuery, update_values, function (err, result) {
    if (err) {
      reject(`Error updating data: ${err}`);
    } else {
      resolve(result);
    }
  }));
}


const deleteUser = async (req, res, next) => {
  const dbQuery = "DELETE FROM app_user;";

  await new Promise ((resolve, reject) => global.db.run(dbQuery, function (err) {
    if (err) {
      reject(`Error deleting data: ${err}`);
    } else {
      resolve("Data deleted!");
    }
  }));
};

module.exports = {
  saveUser,
  getAllUser,
  getUser,
  editUser,
  deleteUser
}