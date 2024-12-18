import React, { useEffect, useState } from "react";
import api from "../api/api";
function AdminDashboard() {
const [logs, setLogs] = useState([]);
const fetchLogs = async () => {
try {
const { data } = await api.get("/acknowledgment/logs");
setLogs(data);
} catch (err) {
alert("Failed to fetch logs.");
}
};
useEffect(() => {
fetchLogs();
}, []);
return (
<div>
<h1>Admin Dashboard</h1>
<table>
<thead>
<tr>
<th>User ID</th>
<th>Medicine ID</th>
<th>Status</th>
<th>Timestamp</th>
</tr>
</thead>
<tbody>
{logs.map((log) => (
<tr key={log.id}>
<td>{log.user_id}</td>
<td>{log.medicine_id}</td>
<td>{log.status}</td>
<td>{new Date(log.timestamp).toLocaleString()}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}
export default AdminDashboard;