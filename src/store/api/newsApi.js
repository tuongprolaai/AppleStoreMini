import { baseApi } from "./baseApi";

export const newsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query({
            query: (params) => ({ url: "/news", params }),
            providesTags: ["News"],
        }),
        getNewsBySlug: builder.query({
            query: (slug) => `/news/${slug}`,
            providesTags: (_, __, slug) => [{ type: "NewsItem", id: slug }],
        }),
        getNewsComments: builder.query({
            query: ({ newsId, params }) => ({
                url: `/news/${newsId}/comments`,
                params,
            }),
            providesTags: (_, __, { newsId }) => [
                { type: "NewsComments", id: newsId },
            ],
        }),
        createNewsComment: builder.mutation({
            query: ({ newsId, ...data }) => ({
                url: `/news/${newsId}/comments`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (_, __, { newsId }) => [
                { type: "NewsComments", id: newsId },
            ],
        }),
        deleteNewsComment: builder.mutation({
            query: ({ newsId, commentId }) => ({
                url: `/news/${newsId}/comments/${commentId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, __, { newsId }) => [
                { type: "NewsComments", id: newsId },
            ],
        }),
        rateNews: builder.mutation({
            query: ({ newsId, rating }) => ({
                url: `/news/${newsId}/rate`,
                method: "POST",
                body: { rating },
            }),
            invalidatesTags: (_, __, { newsId }) => [
                { type: "NewsItem", id: newsId },
            ],
        }),
        getAllNews: builder.query({
            query: (params) => ({ url: "/admin/news", params }),
            providesTags: ["News"],
        }),
        createNews: builder.mutation({
            query: (data) => ({
                url: "/admin/news",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["News"],
        }),
        updateNews: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/news/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["News", "NewsItem"],
        }),
        deleteNews: builder.mutation({
            query: (id) => ({ url: `/admin/news/${id}`, method: "DELETE" }),
            invalidatesTags: ["News"],
        }),
        toggleNewsStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/news/${id}/toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["News"],
        }),
    }),
});

export const {
    useGetNewsQuery,
    useGetNewsBySlugQuery,
    useGetNewsCommentsQuery,
    useCreateNewsCommentMutation,
    useDeleteNewsCommentMutation,
    useRateNewsMutation,
    useGetAllNewsQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
    useToggleNewsStatusMutation,
} = newsApi;
