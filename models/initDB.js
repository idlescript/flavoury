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
      fullname TEXT,
      email TEXT,
      password TEXT,
      signup_datetime TEXT DEFAULT CURRENT_TIMESTAMP,
      last_login TEXT DEFAULT CURRENT_TIMESTAMP,
      profile_picture TEXT
    );

    CREATE TABLE IF NOT EXISTS recipe_folder (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_user_id INTEGER,
      folder_name TEXT,
      FOREIGN KEY (app_user_id) REFERENCES app_user (id)
    );

    CREATE TABLE IF NOT EXISTS recipe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_user_id INTEGER,
      recipe_folder_id INTEGER,
      recipe_title TEXT,
      share_to_public BOOLEAN NOT NULL CHECK (share_to_public IN (0, 1)),
      date_created TEXT DEFAULT CURRENT_TIMESTAMP,
      servings_amount INTEGER,
      prep_time INTEGER,
      cook_time INTEGER,
      FOREIGN KEY (app_user_id) REFERENCES app_user (id),
      FOREIGN KEY (recipe_folder_id) REFERENCES recipe_folder (id) ON DELETE RESTRICT
    );

    CREATE TABLE IF NOT EXISTS recipe_photo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      photo TEXT,
      caption TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      content TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ingredient (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      ingredient_name TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS instruction (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      step_number INTEGER,
      instruction_text TEXT,
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
