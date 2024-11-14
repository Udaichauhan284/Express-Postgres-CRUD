const pool = require('../config/db.js');

const getAllUsersService = async () => {
  const result = await pool.query("SELECT * from users");
  return result.rows;
};

const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * from users where id = $1", [id]);
  return result.rows[0];
};

const createUserService = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *", [name, email]
  );
  return result.rows[0];
};

const updateUserService = async (id, name, email) => {
  const query = `
  UPDATE users
  SET name = $1, email = $2
  WHERE id = $3
  RETURNING *;
  `;
  const values = [name, email, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUserService = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *", [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService
}