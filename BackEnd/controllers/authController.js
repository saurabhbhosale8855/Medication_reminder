const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./Config/db');
exports.register = async (req, res) => {
const { name, email, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const query = 'INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)';
try {
await db.execute(query, [name, email, hashedPassword]);
res.status(201).send({ message: 'User registered successfully' });
} catch (err) {
res.status(500).send({ error: 'Registration failed' });
}
};
exports.login = async (req, res) => {
const { email, password } = req.body;
const query = 'SELECT * FROM Users WHERE email = ?';
try {
const [rows] = await db.execute(query, [email]);
if (!rows.length) return res.status(404).send({ error: 'User not found' });
const user = rows[0];
const isMatch = await bcrypt.compare(password, user.password_hash);
if (!isMatch) return res.status(400).send({ error: 'Invalid credentials' });
const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.status(200).send({ token });
} catch (err) {
res.status(500).send({ error: 'Login failed' });
}
};