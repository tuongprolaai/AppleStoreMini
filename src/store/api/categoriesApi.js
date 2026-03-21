import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── Public ─────────────────────────────────────
        getCategories: builder.query({
            query: () => "/categories",
            providesTags: ["Categories"],
        }),

        // ── Admin ──────────────────────────────────────
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/admin/categories",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),

        updateCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/categories/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/admin/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),

        toggleCategoryStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/categories/${id}/toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useToggleCategoryStatusMutation,
} = categoriesApi;
