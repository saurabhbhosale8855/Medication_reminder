const db = require("../config/db");
const createMedicine = async (userId, name, dosage, scheduleTime) => {
const sql = "INSERT INTO medicines (user_id, name, dosage, schedule_time) VALUES (?, ?, ?, ?)";
await db.query(sql, [userId, name, dosage, scheduleTime]);
};
const getMedicinesByUser = async (userId) => {
const sql = "SELECT * FROM medicines WHERE user_id = ?";
const [rows] = await db.query(sql, [userId]);
return rows;
};
module.exports = { createMedicine, getMedicinesByUser };