import axios from "axios";
import { store } from "@/store";
import { logout, setCredentials } from "@/store/authSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor — tự động gắn JWT token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor — tự động refresh token khi gặp lỗi 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axiosInstance.post(
                    "/auth/refresh-token",
                );
                const { accessToken, user } = response.data;

                // Lưu token mới vào store
                store.dispatch(setCredentials({ accessToken, user }));

                // Gắn token mới vào request cũ và retry
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch {
                // Refresh token hết hạn — logout
                store.dispatch(logout());
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        // Xử lý các lỗi thường gặp
        if (error.response?.status === 403) {
            window.location.href = "/";
        }

        if (error.response?.status === 500) {
            console.error("Server error:", error.response.data);
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
