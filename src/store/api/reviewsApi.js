import { baseApi } from "./baseApi";

export const reviewsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: ({ productId, params }) => ({
                url: `/reviews/${productId}`,
                params,
            }),
            providesTags: (_, __, { productId }) => [
                { type: "Reviews", id: productId },
            ],
        }),

        createReview: builder.mutation({
            query: ({ productId, ...data }) => ({
                url: `/reviews/${productId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (_, __, { productId }) => [
                { type: "Reviews", id: productId },
                "Products",
            ],
        }),

        updateReview: builder.mutation({
            query: ({ productId, reviewId, ...data }) => ({
                url: `/reviews/${productId}/${reviewId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_, __, { productId }) => [
                { type: "Reviews", id: productId },
            ],
        }),

        deleteReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `/reviews/${productId}/${reviewId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, __, { productId }) => [
                { type: "Reviews", id: productId },
                "Products",
            ],
        }),

        likeReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `/reviews/${productId}/${reviewId}/like`,
                method: "POST",
            }),
        }),

        checkPurchased: builder.query({
            query: (productId) => `/reviews/${productId}/check-purchased`,
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
} = reviewsApi;
