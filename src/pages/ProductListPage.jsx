import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { useGetFeaturedProductsQuery } from "@/store/api/productsApi";
import ProductCard from "@/components/shared/ProductCard";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import Breadcrumb from "@/components/shared/Breadcrumb";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ROUTES, SORT_OPTIONS, CATEGORIES, PAGINATION } from "@/lib/constants";

export default function ProductListPage() {
    const { t } = useTranslation("product");
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);

    // Đọc filter từ URL
    const filters = {
        page: Number(searchParams.get("page")) || PAGINATION.DEFAULT_PAGE,
        limit: Number(searchParams.get("limit")) || PAGINATION.DEFAULT_LIMIT,
        category: searchParams.get("category") || undefined,
        minPrice: searchParams.get("minPrice") || undefined,
        maxPrice: searchParams.get("maxPrice") || undefined,
        sort: searchParams.get("sort") || "featured",
        search: searchParams.get("search") || undefined,
    };

    const { data, isLoading, isFetching } = useGetProductsQuery(filters);

    const products = data?.data || [];
    const pagination = data?.pagination || {};

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        // Reset về page 1 khi đổi filter
        if (key !== "page") params.set("page", "1");
        setSearchParams(params);
    };

    const currentCategory = CATEGORIES.find(
        (c) => c.value === filters.category,
    );

    return (
        <div className="section-padding py-8 md:py-12">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: t("page.title"), href: ROUTES.PRODUCTS },
                    ...(currentCategory
                        ? [{ label: currentCategory.label }]
                        : []),
                ]}
                className="mb-6"
            />

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <SectionTitle
                        title={
                            currentCategory
                                ? currentCategory.label
                                : t("page.allProducts")
                        }
                    />
                    {!isLoading && pagination.total > 0 && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t("page.showing")} {products.length} {t("page.of")}{" "}
                            {pagination.total} {t("page.results")}
                        </p>
                    )}
                </div>

                {/* Sort + Filter */}
                <div className="flex items-center gap-2">
                    {/* Sort dropdown */}
                    <Select
                        value={filters.sort}
                        onValueChange={(val) => updateFilter("sort", val)}
                    >
                        <SelectTrigger className="w-48 rounded-full">
                            <SelectValue placeholder={t("sort.label")} />
                        </SelectTrigger>
                        <SelectContent>
                            {SORT_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Filter mobile */}
                    <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full lg:hidden"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80">
                            <FilterPanel
                                filters={filters}
                                onUpdate={updateFilter}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Filter sidebar — desktop */}
                <aside className="hidden w-56 shrink-0 lg:block">
                    <FilterPanel filters={filters} onUpdate={updateFilter} />
                </aside>

                {/* Grid */}
                <div className="min-w-0 flex-1">
                    {isLoading || isFetching ? (
                        <ProductGridSkeleton count={PAGINATION.DEFAULT_LIMIT} />
                    ) : products.length === 0 ? (
                        <EmptyState
                            icon="🔍"
                            title={t("empty.products")}
                            description={t("empty.productsDesc")}
                            actionLabel={t("filter.reset")}
                            onAction={() => setSearchParams({})}
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="mt-10 flex items-center justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        disabled={filters.page <= 1}
                                        onClick={() =>
                                            updateFilter(
                                                "page",
                                                filters.page - 1,
                                            )
                                        }
                                    >
                                        {t("pagination.prev", { ns: "common" })}
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {t("pagination.page", { ns: "common" })}{" "}
                                        {filters.page}{" "}
                                        {t("pagination.of", { ns: "common" })}{" "}
                                        {pagination.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        disabled={
                                            filters.page >=
                                            pagination.totalPages
                                        }
                                        onClick={() =>
                                            updateFilter(
                                                "page",
                                                filters.page + 1,
                                            )
                                        }
                                    >
                                        {t("pagination.next", { ns: "common" })}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Filter Panel ───────────────────────────────────────
function FilterPanel({ filters, onUpdate }) {
    const { t } = useTranslation("product");

    return (
        <div className="space-y-6">
            {/* Category */}
            <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">
                    {t("filter.category")}
                </h3>
                <div className="space-y-1">
                    <button
                        onClick={() => onUpdate("category", "")}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            !filters.category
                                ? "bg-accent font-medium text-foreground"
                                : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                        {t("filter.allCategories")}
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => onUpdate("category", cat.value)}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                filters.category === cat.value
                                    ? "bg-accent font-medium text-foreground"
                                    : "text-muted-foreground hover:bg-muted"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reset */}
            <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full"
                onClick={() => onUpdate("category", "")}
            >
                {t("filter.reset")}
            </Button>
        </div>
    );
}
