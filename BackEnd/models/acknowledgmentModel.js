const db = require("../config/db");
const logAcknowledgment = async (userId, medicineId, status) => {
const sql = "INSERT INTO acknowledgment_logs (user_id, medicine_id, status, timestamp) VALUES (?, ?, ?, NOW())";
await db.query(sql, [userId, medicineId, status]);
};
const getAcknowledgmentLogs = async (filter) => {
const { userId, startDate, endDate } = filter;
let sql = "SELECT * FROM acknowledgment_logs WHERE 1 = 1";
const params = [];
if (userId) {
sql += " AND user_id = ?";
params.push(userId);
}
if (startDate && endDate) {
sql += " AND timestamp BETWEEN ? AND ?";
params.push(startDate, endDate);
}
const [rows] = await db.query(sql, params);
return rows;
};
module.exports = { logAcknowledgment, getAcknowledgmentLogs };
