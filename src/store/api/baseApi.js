import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

// Auto refresh token khi nhận 401
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshToken = api.getState().auth.refreshToken;

        if (refreshToken) {
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

                api.dispatch({
                    type: "auth/setCredentials",
                    payload: { accessToken, refreshToken: newRefreshToken },
                });

                // Retry request gốc với token mới
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch({ type: "auth/logout" });
            }
        } else {
            api.dispatch({ type: "auth/logout" });
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
