import { baseApi } from "./baseApi";
import { updateUser } from "../authSlice";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "/users/profile",
            providesTags: ["Profile"],
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Profile"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateUser(data.data));
                } catch {}
            },
        }),

        uploadAvatar: builder.mutation({
            query: (formData) => ({
                url: "/users/avatar",
                method: "POST",
                body: formData,
                formData: true,
            }),
            invalidatesTags: ["Profile"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateUser({ avatar: data.data.avatar }));
                } catch {}
            },
        }),

        getAddresses: builder.query({
            query: () => "/users/addresses",
            providesTags: ["Addresses"],
        }),

        addAddress: builder.mutation({
            query: (data) => ({
                url: "/users/addresses",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Addresses"],
        }),

        updateAddress: builder.mutation({
            query: ({ addressId, ...data }) => ({
                url: `/users/addresses/${addressId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Addresses"],
        }),

        deleteAddress: builder.mutation({
            query: (addressId) => ({
                url: `/users/addresses/${addressId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Addresses"],
        }),

        setDefaultAddress: builder.mutation({
            query: (addressId) => ({
                url: `/users/addresses/${addressId}/default`,
                method: "PATCH",
            }),
            invalidatesTags: ["Addresses"],
        }),

        // ── Admin ──────────────────────────────────────
        getAllUsers: builder.query({
            query: (params) => ({ url: "/admin/users", params }),
            providesTags: ["Users"],
        }),

        getUserById: builder.query({
            query: (id) => `/admin/users/${id}`,
            providesTags: (_, __, id) => [{ type: "User", id }],
        }),

        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/admin/users/${id}/role`,
                method: "PATCH",
                body: { role },
            }),
            invalidatesTags: ["Users"],
        }),

        toggleUserStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}/toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
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
    useUpdateUserRoleMutation,
    useToggleUserStatusMutation,
    useDeleteUserMutation,
} = usersApi;
