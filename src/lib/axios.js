import axios from "axios";
import { logout, setCredentials } from "@/store/authSlice";

let store;

export const injectStore = (_store) => {
    store = _store;
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ── Request interceptor — gắn accessToken ──
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store?.getState()?.auth?.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// ── Queue xử lý request khi refresh token ──
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

// ── Response interceptor — auto refresh khi 401 ──
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Network error (timeout, mất mạng...)
        if (!error.response) {
            console.error("Network error:", error.message);
            return Promise.reject(error);
        }

        const isAuthRequest =
            originalRequest.url.includes("/login") ||
            originalRequest.url.includes("/refresh-token");

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest._skipAuthRetry &&
            !isAuthRequest
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // refresh token bằng httpOnly cookie
                const response = await axiosInstance.post(
                    "/auth/refresh-token",
                    null,
                    { _skipAuthRetry: true },
                );

                const { accessToken } = response.data.data;

                store.dispatch(
                    setCredentials({
                        accessToken,
                    }),
                );

                processQueue(null, accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
