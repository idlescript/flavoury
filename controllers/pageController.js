
const loadTestPage = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('test-page', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};


const loadHomepage = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('index', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};

const loadPersonalCookbook = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('personalCookbook', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};

const loadPersonalRecipe = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('personalRecipe', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};

const loadPublicCookbook = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('publicCookbook', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};

const loadPublicRecipe = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('publicRecipe', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};

const loadEditRecipe = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('editRecipe', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};

const loadSettings = (req, res, next) => {
  const dbQuery = "SELECT * FROM app_user";
  global.db.all(dbQuery, function (err, dataToSend) {
    if (err) {
      console.error(err);
    } else {

      const dbQuery2 = "SELECT * FROM recipe_folder";
      global.db.all(dbQuery2, function (err, dataToSend2) {
        if (err) {
          console.error(err);
        } else {

          const dbQuery3 = "SELECT * FROM recipe";
          global.db.all(dbQuery3, function (err, dataToSend3) {
            if (err) {
              console.error(err);
            } else {
              res.render('settings', { userData: dataToSend, recipeFolder: dataToSend2, recipeData: dataToSend3 });
            }
          });
        }
      });
    }
  });
};



module.exports = {
  loadTestPage,
  loadHomepage,
  loadPersonalCookbook,
  loadPersonalRecipe,
  loadPublicCookbook,
  loadPublicRecipe,
  loadEditRecipe,
  loadSettings
}