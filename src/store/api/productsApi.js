import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({ url: "/products", params }),
            providesTags: ["Products"],
        }),

        getProductBySlug: builder.query({
            query: (slug) => `/products/slug/${slug}`,
            providesTags: (_, __, slug) => [{ type: "Product", id: slug }],
        }),

        // ✅ Thêm mới — dùng cho AdminProductEdit
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (_, __, id) => [{ type: "Product", id }],
        }),

        getFeaturedProducts: builder.query({
            query: (limit = 8) => ({
                url: "/products/featured",
                params: { limit },
            }),
            providesTags: ["Products"],
        }),

        getNewProducts: builder.query({
            query: (limit = 8) => ({ url: "/products/new", params: { limit } }),
            providesTags: ["Products"],
        }),

        getProductsByCategory: builder.query({
            query: ({ category, limit = 4 }) => ({
                url: "/products",
                params: { category, limit },
            }),
            providesTags: ["Products"],
        }),

        getRelatedProducts: builder.query({
            query: ({ slug, limit = 4 }) => ({
                url: `/products/slug/${slug}/related`,
                params: { limit },
            }),
        }),

        searchProducts: builder.query({
            query: (keyword) => ({
                url: "/products/search",
                params: { q: keyword },
            }),
        }),

        // ── Admin ──────────────────────────────────────
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/admin/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products", "Product"],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/admin/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        uploadProductImages: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/admin/products/${id}/images`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Product", id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductBySlugQuery,
    useGetProductByIdQuery,
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
