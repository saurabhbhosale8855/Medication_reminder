import React, { useEffect, useState } from "react";
import api from "../api/api";
function MedicineSchedule() {
const [medicines, setMedicines] = useState([]);
const [newMedicine, setNewMedicine] = useState({
name: "",
dosage: "",
scheduleTime: "",
});
const fetchMedicines = async () => {
try {
const { data } = await api.get("/medicines/list");
setMedicines(data);
} catch (err) {
alert("Failed to fetch medicines.");
}
};
const handleAddMedicine = async (e) => {
e.preventDefault();
try {
await api.post("/medicines/add", newMedicine);
alert("Medicine added successfully!");
fetchMedicines();
} catch (err) {
alert("Failed to add medicine.");
}
};
useEffect(() => {
fetchMedicines();
}, []);
return (
<div>
<h1>Medicine Schedule</h1>
<form onSubmit={handleAddMedicine}>
<input
type="text"
placeholder="Medicine Name"
value={newMedicine.name}
onChange={(e) =>
setNewMedicine({ ...newMedicine, name: e.target.value })
}
/>
<input
type="text"
placeholder="Dosage"
value={newMedicine.dosage}
onChange={(e) =>
setNewMedicine({ ...newMedicine, dosage: e.target.value })
}
/>
<input
type="datetime-local"
placeholder="Schedule Time"
value={newMedicine.scheduleTime}
onChange={(e) =>
setNewMedicine({ ...newMedicine, scheduleTime: e.target.value })
}
/>
<button type="submit">Add Medicine</button>
</form>
<h2>Your Medicines</h2>
<ul>
{medicines.map((medicine) => (
<li key={medicine.id}>
{medicine.name} - {medicine.dosage} -{" "}
{new Date(medicine.schedule_time).toLocaleString()}
</li>
))}
</ul>
</div>
);
}
export default MedicineSchedule;