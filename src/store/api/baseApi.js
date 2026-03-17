import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setCredentials, logout } from "@/store/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Mutex để tránh nhiều request refresh token cùng lúc
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // gửi httpOnly cookie
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

// Auto refresh token khi 401
const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                // gọi refresh token — cookie tự gửi
                const refreshResult = await baseQuery(
                    {
                        url: "/auth/refresh-token",
                        method: "POST",
                    },
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    const { accessToken } = refreshResult.data.data;

                    // cập nhật accessToken mới
                    api.dispatch(setCredentials({ accessToken }));

                    // retry request ban đầu
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                    api.dispatch(baseApi.util.resetApiState());
                }
            } finally {
                release();
            }
        } else {
            // chờ request refresh khác hoàn thành
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "Products",
        "Product",
        "Orders",
        "Order",
        "Users",
        "User",
        "Reviews",
        "Cart",
        "Profile",
        "Addresses",
    ],
    endpoints: () => ({}),
});
