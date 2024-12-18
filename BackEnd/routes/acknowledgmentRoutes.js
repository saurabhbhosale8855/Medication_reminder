const express = require("express");
const { logAcknowledgment, getAcknowledgmentLogs } = require("../models/acknowledgmentModel");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
// Route to log medicine acknowledgment
router.post("/log", authenticate, async (req, res) => {
const { medicineId, status } = req.body;
if (!medicineId || !status) {
return res.status(400).send({ message: "Medicine ID and status are required" });
}
try {
await logAcknowledgment(req.user.id, medicineId, status);
res.status(201).send({ message: "Acknowledgment logged successfully" });
} catch (err) {
res.status(500).send({ message: "Error logging acknowledgment", error: err });
}
});
// Route to fetch acknowledgment logs (Super Admin only)
router.get("/logs", authenticate, async (req, res) => {
const { userId, startDate, endDate } = req.query;
// Check if the user is a Super Admin
if (req.user.role !== "admin") {
return res.status(403).send({ message: "Access denied" });
}
try {
const filters = { userId, startDate, endDate };
const logs = await getAcknowledgmentLogs(filters);
res.send(logs);
} catch (err) {
res.status(500).send({ message: "Error fetching acknowledgment logs", error: err });
}
});
module.exports = router;