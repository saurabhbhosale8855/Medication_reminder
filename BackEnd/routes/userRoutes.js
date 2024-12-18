const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/userModel");
const router = express.Router();
router.post("/register", async (req, res) => {
const { name, email, password, role } = req.body;
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
try {
await createUser(name, email, hashedPassword, role || "user");
res.status(201).send({ message: "User registered successfully" });
} catch (err) {
res.status(500).send({ message: "Error registering user", error: err });
}
});
router.post("/login", async (req, res) => {
const { email, password } = req.body;
const user = await getUserByEmail(email);
if (!user || !(await bcrypt.compare(password, user.password))) {
return res.status(401).send({ message: "Invalid credentials" });
}
const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
expiresIn: "1h",
});
res.send({ token });
});
module.exports = router;