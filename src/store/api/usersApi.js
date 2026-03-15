import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── User endpoints ────────────────────────────────

        // Lấy thông tin profile của mình
        getProfile: builder.query({
            query: () => "/users/profile",
            providesTags: ["Profile"],
        }),

        // Cập nhật thông tin profile
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PUT",
                body: data,
                // data gồm: name, phone, birthday, gender
            }),
            invalidatesTags: ["Profile"],
        }),

        // Upload avatar
        uploadAvatar: builder.mutation({
            query: (formData) => ({
                url: "/users/profile/avatar",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Profile"],
        }),

        // Lấy danh sách địa chỉ
        getAddresses: builder.query({
            query: () => "/users/addresses",
            providesTags: ["Profile"],
        }),

        // Thêm địa chỉ mới
        addAddress: builder.mutation({
            query: (data) => ({
                url: "/users/addresses",
                method: "POST",
                body: data,
                // data gồm: name, phone, province, district, ward, address, isDefault
            }),
            invalidatesTags: ["Profile"],
        }),

        // Cập nhật địa chỉ
        updateAddress: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/users/addresses/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),

        // Xoá địa chỉ
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/users/addresses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Profile"],
        }),

        // Đặt địa chỉ mặc định
        setDefaultAddress: builder.mutation({
            query: (id) => ({
                url: `/users/addresses/${id}/default`,
                method: "PUT",
            }),
            invalidatesTags: ["Profile"],
        }),

        // ── Admin endpoints ───────────────────────────────

        // Lấy danh sách tất cả user — chỉ admin
        getAllUsers: builder.query({
            query: (params) => ({
                url: "/admin/users",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    search: params?.search,
                    role: params?.role,
                },
            }),
            providesTags: ["UserList"],
        }),

        // Lấy chi tiết 1 user — chỉ admin
        getUserById: builder.query({
            query: (id) => `/admin/users/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }],
        }),

        // Cập nhật thông tin user — chỉ admin
        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/users/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "User", id },
                "UserList",
            ],
        }),

        // Cập nhật role user — chỉ admin
        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/admin/users/${id}/role`,
                method: "PUT",
                body: { role },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "User", id },
                "UserList",
            ],
        }),

        // Khoá / mở khoá tài khoản — chỉ admin
        toggleUserStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}/toggle-status`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "User", id },
                "UserList",
            ],
        }),

        // Xoá user — chỉ admin
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["UserList"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation,
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useSetDefaultAddressMutation,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useUpdateUserRoleMutation,
    useToggleUserStatusMutation,
    useDeleteUserMutation,
} = usersApi;
