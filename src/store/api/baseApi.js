import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Khởi tạo mutex để khóa các request khi đang gọi API refresh token
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Auto refresh token khi nhận 401 với cơ chế Mutex (chống gọi refresh nhiều lần)
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Đợi cho đến khi mutex mở khóa (nếu đang có 1 luồng khác xử lý refresh token)
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Kiểm tra xem mutex đã bị khóa chưa
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = api.getState().auth.refreshToken;

                if (refreshToken) {
                    // Gọi API lấy token mới
                    const refreshResult = await baseQuery(
                        {
                            url: "/auth/refresh-token",
                            method: "POST",
                            body: { refreshToken },
                        },
                        api,
                        extraOptions,
                    );

                    if (refreshResult.data) {
                        const { accessToken, refreshToken: newRefreshToken } =
                            refreshResult.data.data;

                        // Cập nhật token mới vào Redux store
                        api.dispatch({
                            type: "auth/setCredentials",
                            payload: {
                                accessToken,
                                refreshToken: newRefreshToken,
                            },
                        });

                        // Gọi lại request gốc (request bị lỗi 401 ban đầu) với token mới
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch({ type: "auth/logout" });
                    }
                } else {
                    api.dispatch({ type: "auth/logout" });
                }
            } finally {
                // Quan trọng: Phải mở khóa để các request đang đợi được chạy tiếp
                release();
            }
        } else {
            // Nếu mutex đã bị khóa bởi 1 request 401 khác, chỉ cần đợi nó mở khóa
            // (tức là đã refresh xong) rồi tự động gọi lại request gốc
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
