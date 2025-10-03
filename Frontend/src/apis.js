import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE from env:", API_BASE);
const api = axios.create({
    baseURL: `${API_BASE}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
});


// ✅ Add interceptor to attach token automatically
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token"); // where you saved login token
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });


export default api;
