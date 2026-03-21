import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (params) => ({ url: "/orders", params }),
            providesTags: ["Orders"],
        }),

        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: (_, __, id) => [{ type: "Order", id }],
        }),

        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Orders", "Cart"],
        }),

        cancelOrder: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/orders/${id}/cancel`,
                method: "POST",
                body: { reason },
            }),
            invalidatesTags: ["Orders", "Order"],
        }),

        confirmDelivered: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/confirm-delivered`,
                method: "POST",
            }),
            invalidatesTags: ["Orders", "Order"],
        }),

        // ── Admin ──────────────────────────────────────
        getAllOrders: builder.query({
            query: (params) => ({ url: "/admin/orders", params }),
            providesTags: ["Orders"],
        }),

        updateOrderStatus: builder.mutation({
            query: ({ id, status, note }) => ({
                url: `/admin/orders/${id}/status`,
                method: "PATCH",
                body: { status, note },
            }),
            invalidatesTags: ["Orders", "Order"],
        }),

        getRevenueStats: builder.query({
            query: (params) => ({
                url: "/admin/dashboard/revenue",
                params,
            }),
        }),
        getAdminOrderById: builder.query({
            query: (id) => `/admin/orders/${id}`,
            providesTags: (_, __, id) => [{ type: "Order", id }],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useCancelOrderMutation,
    useConfirmDeliveredMutation,
    useGetAllOrdersQuery,
    useGetAdminOrderByIdQuery,
    useUpdateOrderStatusMutation,
    useGetRevenueStatsQuery,
} = ordersApi;
