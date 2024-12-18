const express = require("express");
const { createMedicine, getMedicinesByUser } = require("../models/medicineModel");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add", authenticate, async (req, res) => {
const { name, dosage, scheduleTime } = req.body;
try {
await createMedicine(req.user.id, name, dosage, scheduleTime);
res.status(201).send({ message: "Medicine added successfully" });
} catch (err) {
res.status(500).send({ message: "Error adding medicine", error: err });
}
});
router.get("/list", authenticate, async (req, res) => {
try {
const medicines = await getMedicinesByUser(req.user.id);
res.send(medicines);
} catch (err) {
res.status(500).send({ message: "Error fetching medicines", error: err });
}
});
module.exports = router;