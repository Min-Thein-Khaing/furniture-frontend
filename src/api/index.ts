import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

//request interceptor for auth
// api.interceptors.request.use(
//     (config) => {
//         const authStore = JSON.parse(localStorage.getItem("auth") || "{}");
//         const token = authStore?.state?.token;
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

//response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // window.location.href = "/login";
            window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        }
        return Promise.reject(error);
    }
);

export const authApi = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});