import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useGetProductsByCategoryQuery } from "@/store/api/productsApi";
import MegaMenuItem from "./MegaMenuItem";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export default function MegaMenu({ category }) {
    const { t } = useTranslation("product");
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useGetProductsByCategoryQuery(
        { category: category.value, limit: 4 },
        { skip: !isOpen },
    );
    const products = data?.data || [];

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Trigger */}
            <button
                className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    isOpen
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                )}
            >
                {category.label}
                <ChevronDown
                    className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-[520px] -translate-x-1/2">
                    <div className="mx-auto mb-1 h-2 w-4 overflow-hidden">
                        <div className="mx-auto h-3 w-3 rotate-45 border border-border bg-popover" />
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
                        <div className="grid grid-cols-3 gap-0">
                            {/* Left — links */}
                            <div className="col-span-1 border-r border-border p-4">
                                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    {category.label}
                                </p>
                                <div className="space-y-0.5">
                                    <Link
                                        to={category.href}
                                        className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                    >
                                        {t("category.all")} {category.label}
                                    </Link>
                                    <Link
                                        to={`${category.href}&sort=newest`}
                                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {t("sort.newest")}
                                    </Link>
                                    <Link
                                        to={`${category.href}&sort=best_seller`}
                                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {t("sort.bestSeller")}
                                    </Link>
                                    <Link
                                        to={`${category.href}&sort=price_asc`}
                                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {t("sort.priceAsc")}
                                    </Link>
                                </div>
                            </div>

                            {/* Right — featured products dùng MegaMenuItem */}
                            <div className="col-span-2 p-4">
                                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    {t("home.featured")}
                                </p>
                                {products.length === 0 ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-24 animate-pulse rounded-xl bg-muted"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {products.map((product) => (
                                            <MegaMenuItem
                                                key={product.id}
                                                product={product}
                                                onClick={() => setIsOpen(false)}
                                            />
                                        ))}
                                    </div>
                                )}
                                <Link
                                    to={category.href}
                                    className="mt-3 flex items-center justify-end text-xs font-medium text-apple-blue hover:opacity-70"
                                >
                                    {t("home.discoverMore")} →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
