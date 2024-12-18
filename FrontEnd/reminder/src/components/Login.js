import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleLogin = async (e) => {
e.preventDefault();
try {
const { data } = await api.post("/auth/login", { email, password });
localStorage.setItem("token", data.token);
alert("Login successful!");
navigate("/schedule");
} catch (err) {
alert("Login failed. Please check your credentials.");
}
};
return (
<div>
<h1>Login</h1>
<form onSubmit={handleLogin}>
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
<button type="submit">Login</button>
</form>
</div>
);
}
export default Login;