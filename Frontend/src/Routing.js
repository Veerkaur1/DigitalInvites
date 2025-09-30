const API_BASE = import.meta.env.VITE_API_BASE_URL;


export const API = {
    Login: {
        url: `${API_BASE}/api/auth/login`,
        method: `POST`
    },
    Register: {
        url: `${API_BASE}/api/Register`,
        method: `POST`
    }
}







