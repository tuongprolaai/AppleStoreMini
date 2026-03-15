import { baseApi } from "./baseApi";

export const reviewsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── User endpoints ────────────────────────────────

        // Lấy danh sách review của 1 sản phẩm
        getReviews: builder.query({
            query: ({ productId, params }) => ({
                url: `/products/${productId}/reviews`,
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    sort: params?.sort || "newest",
                    rating: params?.rating,
                },
            }),
            providesTags: (result, error, { productId }) => [
                { type: "Review", id: productId },
            ],
        }),

        // Viết review cho sản phẩm đã mua
        createReview: builder.mutation({
            query: ({ productId, ...data }) => ({
                url: `/products/${productId}/reviews`,
                method: "POST",
                body: data,
                // data gồm: rating, comment, images[]
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: "Review", id: productId },
                { type: "Product", id: productId },
            ],
        }),

        // Cập nhật review của mình
        updateReview: builder.mutation({
            query: ({ reviewId, ...data }) => ({
                url: `/reviews/${reviewId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: "Review", id: productId },
            ],
        }),

        // Xoá review của mình
        deleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),

        // Like / unlike review
        likeReview: builder.mutation({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}/like`,
                method: "POST",
            }),
            invalidatesTags: ["Review"],
        }),

        // Kiểm tra user đã mua sản phẩm chưa — để hiện form review
        checkPurchased: builder.query({
            query: (productId) => `/products/${productId}/check-purchased`,
        }),

        // ── Admin endpoints ───────────────────────────────

        // Lấy tất cả review — chỉ admin
        getAllReviews: builder.query({
            query: (params) => ({
                url: "/admin/reviews",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    rating: params?.rating,
                    search: params?.search,
                },
            }),
            providesTags: ["Review"],
        }),

        // Xoá review — chỉ admin
        adminDeleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/admin/reviews/${reviewId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useLikeReviewMutation,
    useCheckPurchasedQuery,
    useGetAllReviewsQuery,
    useAdminDeleteReviewMutation,
} = reviewsApi;
