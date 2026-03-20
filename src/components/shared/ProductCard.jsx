import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "@/store/wishlistSlice";
import { toggleAuthModal, toggleCartDrawer } from "@/store/uiSlice";
import { selectIsAuthenticated } from "@/store/authSlice";
import { formatPrice, calcDiscount, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

import productPlaceholder from "@/assets/images/placeholder/product-placeholder.jpg";

export default function ProductCard({ product }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInWishlist = useSelector(
        selectIsInWishlist(product._id || product.id),
    );

    const effectivePrice =
        product.salePrice && product.salePrice < product.price
            ? product.salePrice
            : product.price;

    const discount = calcDiscount(product.originalPrice, effectivePrice);

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(
            addToCart({
                product,
                quantity: 1,
                selectedColor: product.colors?.[0]?.name || "",
                selectedStorage: product.storage?.[0]?.label || "",
            }),
        );
        dispatch(toggleCartDrawer(true));
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            dispatch(toggleAuthModal(true));
            return;
        }
        dispatch(toggleWishlist(product));
    };

    return (
        <Card className="group overflow-hidden border-transparent bg-muted/30 transition-all duration-200 hover:border-border hover:shadow-md">
            {/* Image */}
            <Link to={ROUTES.PRODUCT_DETAIL(product.slug)}>
                <div
                    className="relative overflow-hidden bg-white p-4 dark:bg-muted/10"
                    style={{ aspectRatio: "4/3" }}
                >
                    {/* Badges */}
                    <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
                        {product.isNew && (
                            <Badge variant="secondary" className="text-[10px]">
                                {t("product.new")}
                            </Badge>
                        )}
                        {discount > 0 && (
                            <Badge
                                variant="destructive"
                                className="text-[10px]"
                            >
                                -{discount}%
                            </Badge>
                        )}
                        {!product.inStock && (
                            <Badge variant="outline" className="text-[10px]">
                                {t("product.outOfStock")}
                            </Badge>
                        )}
                    </div>

                    {/* Wishlist button */}
                    <button
                        onClick={handleToggleWishlist}
                        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110"
                        aria-label="Thêm vào yêu thích"
                    >
                        <Heart
                            className={cn(
                                "h-3.5 w-3.5 transition-colors",
                                isInWishlist
                                    ? "fill-red-500 text-red-500"
                                    : "text-muted-foreground",
                            )}
                        />
                    </button>

                    {/* Product image */}
                    <img
                        src={
                            product.images?.[0] ||
                            product.image ||
                            productPlaceholder
                        }
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = productPlaceholder;
                        }}
                    />
                </div>
            </Link>

            {/* Info */}
            <CardContent className="p-3 text-center">
                <div className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {product.category}
                </div>

                <Link to={ROUTES.PRODUCT_DETAIL(product.slug)}>
                    <h3 className="line-clamp-1 text-sm font-semibold transition-colors hover:text-apple-blue">
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="mt-1.5 flex items-center justify-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">
                        {formatPrice(effectivePrice)}
                    </span>
                    {product.originalPrice &&
                        product.originalPrice > effectivePrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="justify-center p-3 pt-0">
                <Button
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="h-8 w-full gap-1.5 rounded-full text-xs transition-transform active:scale-95"
                >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {product.inStock
                        ? t("btn.addToCart")
                        : t("product.outOfStock")}
                </Button>
            </CardFooter>
        </Card>
    );
}
