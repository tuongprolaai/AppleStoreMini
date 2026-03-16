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
            // Dùng prevParams để đảm bảo luôn lấy state mới nhất
            setSearchParams((prevParams) => {
                const params = new URLSearchParams(prevParams);
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
                // Reset về trang 1 nếu thay đổi bộ lọc
                if (key !== "page") params.set("page", "1");
                return params;
            });
        },
        [setSearchParams],
    );

    // Bổ sung: Hàm cập nhật nhiều filter cùng lúc (rất hữu ích cho cục Filter có nút "Áp dụng")
    const updateMultipleFilters = useCallback(
        (updates) => {
            setSearchParams((prevParams) => {
                const params = new URLSearchParams(prevParams);
                Object.entries(updates).forEach(([key, value]) => {
                    if (value) params.set(key, value);
                    else params.delete(key);
                });
                params.set("page", "1");
                return params;
            });
        },
        [setSearchParams],
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
        updateMultipleFilters, // Export hàm mới
        resetFilters,
        activeFilterCount,
    };
}
