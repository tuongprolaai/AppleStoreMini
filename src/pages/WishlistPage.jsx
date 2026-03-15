import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import {
    selectWishlistItems,
    selectWishlistCount,
    removeFromWishlist,
} from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
import { toggleCartDrawer } from "@/store/uiSlice";
import ProductCard from "@/components/shared/ProductCard";
import EmptyState from "@/components/shared/EmptyState";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { ROUTES } from "@/lib/constants";

export default function WishlistPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const items = useSelector(selectWishlistItems);
    const count = useSelector(selectWishlistCount);

    return (
        <div className="section-padding py-8 md:py-12">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[{ label: t("nav.wishlist") }]}
                className="mb-6"
            />

            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <Heart className="h-6 w-6 text-foreground" />
                <h1 className="text-3xl font-semibold text-foreground">
                    {t("nav.wishlist")}
                </h1>
                {count > 0 && (
                    <span className="text-lg font-normal text-muted-foreground">
                        ({count})
                    </span>
                )}
            </div>

            {/* Content */}
            {items.length === 0 ? (
                <EmptyState
                    icon="❤️"
                    title={t("empty.wishlist")}
                    description={t("empty.wishlistDesc")}
                    actionLabel={t("btn.continueShopping")}
                    actionHref={ROUTES.PRODUCTS}
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
