import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Bọc thêm logic refresh token tự động khi gặp lỗi 401
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        // Thử gọi refresh token
        const refreshResult = await baseQuery(
            { url: "/auth/refresh-token", method: "POST" },
            api,
            extraOptions,
        );

        if (refreshResult?.data) {
            // Lưu token mới vào store
            api.dispatch(setCredentials(refreshResult.data));
            // Gọi lại request ban đầu với token mới
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Refresh token cũng hết hạn — logout
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "Product",
        "ProductList",
        "Order",
        "OrderList",
        "User",
        "UserList",
        "Cart",
        "Review",
        "Wishlist",
        "Profile",
    ],
    endpoints: () => ({}),
});
