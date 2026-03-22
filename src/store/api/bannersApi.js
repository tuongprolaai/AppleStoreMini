import { baseApi } from "./baseApi";

export const bannersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Public
        getBanners: builder.query({
            query: () => "/banners",
            providesTags: ["Banners"],
        }),

        // Admin
        getAllBanners: builder.query({
            query: () => "/admin/banners",
            providesTags: ["Banners"],
        }),

        createBanner: builder.mutation({
            query: (formData) => ({
                url: "/admin/banners",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Banners"],
        }),

        updateBanner: builder.mutation({
            query: ({ id, ...formData }) => ({
                url: `/admin/banners/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Banners"],
        }),

        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/admin/banners/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Banners"],
        }),

        toggleBannerStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/banners/${id}/toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["Banners"],
        }),

        updateBannerOrders: builder.mutation({
            query: (orders) => ({
                url: "/admin/banners/orders",
                method: "PATCH",
                body: { orders },
            }),
            invalidatesTags: ["Banners"],
        }),
    }),
});

export const {
    useGetBannersQuery,
    useGetAllBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
    useToggleBannerStatusMutation,
    useUpdateBannerOrdersMutation,
} = bannersApi;
