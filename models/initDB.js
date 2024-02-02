const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function initializeDatabase() {

  const initDB = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  await initDB.exec(`
    CREATE TABLE IF NOT EXISTS app_user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      signup_datetime TEXT DEFAULT CURRENT_TIMESTAMP,
      last_login TEXT DEFAULT CURRENT_TIMESTAMP,
      profile_picture TEXT
    );

    CREATE TABLE IF NOT EXISTS recipe_folder (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_user_id INTEGER NOT NULL,
      folder_name TEXT,
      FOREIGN KEY (app_user_id) REFERENCES app_user (id)
    );

    CREATE TABLE IF NOT EXISTS recipe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_user_id INTEGER NOT NULL,
      recipe_folder_id INTEGER NOT NULL,
      recipe_title TEXT,
      share_to_public TEXT,
      date_created TEXT DEFAULT CURRENT_TIMESTAMP,
      servings_amount INTEGER,
      prep_time INTEGER,
      cook_time INTEGER,
      ingredient TEXT,
      instruction TEXT,
      recipe_note TEXT,
      FOREIGN KEY (app_user_id) REFERENCES app_user (id),
      FOREIGN KEY (recipe_folder_id) REFERENCES recipe_folder (id) ON DELETE RESTRICT
    );

    CREATE TABLE IF NOT EXISTS recipe_photo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER NOT NULL,
      photo TEXT,
      caption TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
    );
  `);

  await initDB.close();

  global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
      console.error(err);
      process.exit(1); //can't connect to the DB
    }else{
      console.log("Database connected");
      global.db.run("PRAGMA foreign_keys=ON"); //foreign key constraints
    }
  });
}

module.exports = {
  initializeDatabase
};
