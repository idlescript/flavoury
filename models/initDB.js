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
      signup_datetime TEXT,
      last_login TEXT,
      profile_picture TEXT
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
