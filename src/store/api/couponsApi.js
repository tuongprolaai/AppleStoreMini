import { baseApi } from "./baseApi";

export const couponsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── User ──────────────────────────────────────
        applyCoupon: builder.mutation({
            query: ({ code, orderTotal }) => ({
                url: "/coupons/apply",
                method: "POST",
                body: { code, orderTotal },
            }),
        }),

        // ── Admin ──────────────────────────────────────
        getAllCoupons: builder.query({
            query: (params) => ({ url: "/admin/coupons", params }),
            providesTags: ["Coupons"],
        }),

        getCouponById: builder.query({
            query: (id) => `/admin/coupons/${id}`,
            providesTags: (_, __, id) => [{ type: "Coupon", id }],
        }),

        createCoupon: builder.mutation({
            query: (data) => ({
                url: "/admin/coupons",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Coupons"],
        }),

        updateCoupon: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/coupons/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Coupons", "Coupon"],
        }),

        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/admin/coupons/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Coupons"],
        }),

        toggleCouponStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/coupons/${id}/toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["Coupons"],
        }),
    }),
});

export const {
    useApplyCouponMutation,
    useGetAllCouponsQuery,
    useGetCouponByIdQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    useToggleCouponStatusMutation,
} = couponsApi;
