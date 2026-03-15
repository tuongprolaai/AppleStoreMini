import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Lấy giỏ hàng từ server — dùng sau khi đăng nhập
        getServerCart: builder.query({
            query: () => "/cart",
            providesTags: ["Cart"],
        }),

        // Sync giỏ hàng local lên server sau khi đăng nhập
        syncCart: builder.mutation({
            query: (cartItems) => ({
                url: "/cart/sync",
                method: "POST",
                body: { items: cartItems },
            }),
            invalidatesTags: ["Cart"],
        }),

        // Thêm sản phẩm vào giỏ hàng server
        addToCart: builder.mutation({
            query: (item) => ({
                url: "/cart/add",
                method: "POST",
                body: item, // { productId, quantity, color, storage }
            }),
            invalidatesTags: ["Cart"],
        }),

        // Cập nhật số lượng sản phẩm trong giỏ
        updateCartItem: builder.mutation({
            query: ({ itemId, quantity }) => ({
                url: `/cart/${itemId}`,
                method: "PUT",
                body: { quantity },
            }),
            invalidatesTags: ["Cart"],
        }),

        // Xoá 1 sản phẩm khỏi giỏ hàng server
        removeFromCart: builder.mutation({
            query: (itemId) => ({
                url: `/cart/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

        // Xoá toàn bộ giỏ hàng server — dùng sau khi đặt hàng xong
        clearServerCart: builder.mutation({
            query: () => ({
                url: "/cart",
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetServerCartQuery,
    useSyncCartMutation,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearServerCartMutation,
} = cartApi;
