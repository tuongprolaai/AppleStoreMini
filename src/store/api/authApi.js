import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials, // { email, password }
            }),
        }),

        register: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User", "Cart", "Order"],
        }),

        getMe: builder.query({
            query: () => "/auth/me",
            providesTags: ["Profile"],
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { email },
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `/auth/reset-password/${token}`,
                method: "POST",
                body: { password },
            }),
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "PUT",
                body: data, // { currentPassword, newPassword }
            }),
        }),

        loginWithGoogle: builder.mutation({
            query: (tokenId) => ({
                url: "/auth/google",
                method: "POST",
                body: { tokenId },
            }),
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh-token",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetMeQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useLoginWithGoogleMutation,
    useRefreshTokenMutation,
} = authApi;
