import React, { useState } from "react";
import api from "../api/api";
function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleRegister = async (e) => {
e.preventDefault();
try {
await api.post("/auth/register", { name, email, password });
alert("Registration successful! Please log in.");
} catch (err) {
alert("Registration failed. Try again.");
}
};
return (
<div>
<h1>Register</h1>
<form onSubmit={handleRegister}>
<input
type="text"
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<button type="submit">Register</button>
</form>
</div>
);
}
export default Register;