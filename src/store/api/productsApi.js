import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── User endpoints ────────────────────────────────

        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: "Product",
                              id,
                          })),
                          { type: "Product", id: "LIST" },
                      ]
                    : [{ type: "Product", id: "LIST" }],
        }),

        getProductBySlug: builder.query({
            query: (slug) => `/products/slug/${slug}`,
            providesTags: (result, error, slug) => [
                { type: "Product", id: slug },
            ],
        }),

        getFeaturedProducts: builder.query({
            query: (limit = 8) => ({
                url: "/products/featured",
                params: { limit },
            }),
            providesTags: [{ type: "Product", id: "FEATURED" }],
        }),

        getNewProducts: builder.query({
            query: (limit = 8) => ({
                url: "/products",
                params: { sort: "newest", limit },
            }),
            providesTags: [{ type: "Product", id: "NEW" }],
        }),

        getProductsByCategory: builder.query({
            query: ({ category, limit = 8 }) => ({
                url: "/products",
                params: { category, limit },
            }),
            providesTags: [{ type: "Product", id: "LIST" }],
        }),

        getRelatedProducts: builder.query({
            query: ({ slug, limit = 4 }) => ({
                url: `/products/slug/${slug}/related`,
                params: { limit },
            }),
            providesTags: [{ type: "Product", id: "LIST" }],
        }),

        searchProducts: builder.query({
            query: (keyword) => ({
                url: "/products/search",
                params: { q: keyword, limit: 5 },
            }),
        }),

        // ── Admin endpoints ───────────────────────────────

        createProduct: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }],
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Product", id },
                { type: "Product", id: "LIST" },
            ],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }],
        }),

        uploadProductImages: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/products/${id}/images`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Product", id },
            ],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductBySlugQuery,
    useGetFeaturedProductsQuery,
    useGetNewProductsQuery,
    useGetProductsByCategoryQuery,
    useGetRelatedProductsQuery,
    useSearchProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadProductImagesMutation,
} = productsApi;
