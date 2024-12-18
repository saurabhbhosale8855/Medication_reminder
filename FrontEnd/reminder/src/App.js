import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MedicineSchedule from "./components/MedicineSchedule";
import AdminDashboard from "./components/AdminDashboard";
function App() {
return (
<Router>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/schedule" element={<MedicineSchedule />} />
<Route path="/admin" element={<AdminDashboard />} />
</Routes>
</Router>
);
}
export default App;