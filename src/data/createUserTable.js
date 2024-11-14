const pool = require("../config/db.js");

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  try {
    pool.query(queryText);
    console.log("User Table created if not exixits");
  }catch(err){
    console.log("User creating users table :", err);
  }
};

module.exports = createUserTable;