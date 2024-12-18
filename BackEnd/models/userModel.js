const db = require("../config/db");
const createUser = async (name, email, passwordHash, role) => {
const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
await db.query(sql, [name, email, passwordHash, role]);
};
const getUserByEmail = async (email) => {
const sql = "SELECT * FROM users WHERE email = ?";
const [rows] = await db.query(sql, [email]);
return rows[0];
};
module.exports = { createUser, getUserByEmail };