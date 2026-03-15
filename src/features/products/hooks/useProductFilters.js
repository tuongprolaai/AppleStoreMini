import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { PAGINATION } from "@/lib/constants";

export function useProductFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = {
        page: Number(searchParams.get("page")) || PAGINATION.DEFAULT_PAGE,
        limit: Number(searchParams.get("limit")) || PAGINATION.DEFAULT_LIMIT,
        category: searchParams.get("category") || undefined,
        minPrice: searchParams.get("minPrice") || undefined,
        maxPrice: searchParams.get("maxPrice") || undefined,
        sort: searchParams.get("sort") || "featured",
        search: searchParams.get("search") || undefined,
        color: searchParams.get("color") || undefined,
        storage: searchParams.get("storage") || undefined,
    };

    const updateFilter = useCallback(
        (key, value) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            if (key !== "page") params.set("page", "1");
            setSearchParams(params);
        },
        [searchParams, setSearchParams],
    );

    const resetFilters = useCallback(() => {
        setSearchParams({});
    }, [setSearchParams]);

    const activeFilterCount = [
        filters.category,
        filters.minPrice,
        filters.maxPrice,
        filters.color,
        filters.storage,
    ].filter(Boolean).length;

    return {
        filters,
        updateFilter,
        resetFilters,
        activeFilterCount,
    };
}
