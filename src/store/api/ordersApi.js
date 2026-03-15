import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── User endpoints ────────────────────────────────

        // Lấy danh sách đơn hàng của user hiện tại
        getOrders: builder.query({
            query: (params) => ({
                url: "/orders",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    status: params?.status,
                },
            }),
            providesTags: ["OrderList"],
        }),

        // Lấy chi tiết 1 đơn hàng
        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: "Order", id }],
        }),

        // Tạo đơn hàng mới
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
                // data gồm: items[], shippingAddress, paymentMethod
            }),
            invalidatesTags: ["OrderList", "Cart"],
        }),

        // Huỷ đơn hàng
        cancelOrder: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/orders/${id}/cancel`,
                method: "PUT",
                body: { reason },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Order", id },
                "OrderList",
            ],
        }),

        // Xác nhận đã nhận hàng
        confirmDelivered: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/confirm`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Order", id },
                "OrderList",
            ],
        }),

        // ── Admin endpoints ───────────────────────────────

        // Lấy tất cả đơn hàng — chỉ admin
        getAllOrders: builder.query({
            query: (params) => ({
                url: "/admin/orders",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    status: params?.status,
                    search: params?.search,
                },
            }),
            providesTags: ["OrderList"],
        }),

        // Cập nhật trạng thái đơn hàng — chỉ admin
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/admin/orders/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Order", id },
                "OrderList",
            ],
        }),

        // Thống kê doanh thu — chỉ admin
        getRevenueStats: builder.query({
            query: (params) => ({
                url: "/admin/orders/stats",
                params: {
                    period: params?.period || "month", // day, week, month, year
                    year: params?.year,
                },
            }),
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
    useUpdateOrderStatusMutation,
    useGetRevenueStatsQuery,
} = ordersApi;
