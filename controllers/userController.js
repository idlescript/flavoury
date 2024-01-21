
function randomDigit(digit_amount) {  // for testing purpose only
  return Math.floor(10 ** (digit_amount-1) + Math.random() * (10 ** digit_amount-1));
}

const saveUser = (req, res, next) => {
  
  const fullname = (req.body.fullname) ? req.body.fullname : "fullname"+randomDigit(4);
  const email = (req.body.email) ? req.body.email : "email"+randomDigit(4);
  const password = (req.body.password) ? req.body.password : "password"+randomDigit(4);
  const profile_picture = "profilepic"+randomDigit(4);

  const update_values = [fullname, email, password, profile_picture];
  const dbQuery = "INSERT INTO app_user ('fullname', 'email', 'password', 'profile_picture') VALUES( ?, ?, ?, ?);";

  global.db.run(dbQuery, update_values, function (err) {
    if (err) {
      console.error(`Error saving data: ${err}`);
    } else {
      res.redirect('/test');  //need to be changed
    }
  });
};

const deleteUser = (req, res, next) => {
  const dbQuery = "DELETE FROM app_user;";

  global.db.run(dbQuery, function (err) {
    if (err) {
      console.error(`Error deleting data: ${err}`);
    } else {
      res.redirect('/test');  //need to be changed
    }
  });
};


module.exports = {
  saveUser,
  deleteUser
}