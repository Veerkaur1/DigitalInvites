import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE from env:", API_BASE);
const api = axios.create({
    baseURL: `${API_BASE}/api/auth`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
