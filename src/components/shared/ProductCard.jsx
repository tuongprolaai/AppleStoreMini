import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "@/store/wishlistSlice";
import { toggleAuthModal } from "@/store/uiSlice";
import { selectIsAuthenticated } from "@/store/authSlice";
import { formatPrice, calcDiscount, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

import productPlaceholder from "@/assets/images/placeholder/product-placeholder.jpg";

export default function ProductCard({ product }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInWishlist = useSelector(selectIsInWishlist(product.id));

    const discount = calcDiscount(product.originalPrice, product.price);

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
        <Card className="group overflow-hidden border-transparent bg-muted/30 transition-all hover:border-border hover:shadow-md">
            {/* Image */}
            <Link to={ROUTES.PRODUCT_DETAIL(product.slug)}>
                <div className="relative aspect-square overflow-hidden bg-white p-6 dark:bg-muted/10">
                    {/* Badges */}
                    <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
                        {product.isNew && (
                            <Badge variant="secondary">
                                {t("product.new")}
                            </Badge>
                        )}
                        {discount > 0 && (
                            <Badge variant="destructive">-{discount}%</Badge>
                        )}
                        {!product.inStock && (
                            <Badge variant="outline">
                                {t("product.outOfStock")}
                            </Badge>
                        )}
                    </div>

                    {/* Wishlist button */}
                    <button
                        onClick={handleToggleWishlist}
                        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110"
                    >
                        <Heart
                            className={cn(
                                "h-4 w-4 transition-colors",
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
            <CardContent className="p-4 text-center">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {product.category}
                </div>

                <Link to={ROUTES.PRODUCT_DETAIL(product.slug)}>
                    <h3 className="line-clamp-1 text-base font-semibold transition-colors hover:text-apple-blue">
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="font-medium text-foreground">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice &&
                        product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="justify-center p-4 pt-0">
                <Button
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full gap-2 rounded-full transition-transform active:scale-95"
                >
                    <ShoppingCart className="h-4 w-4" />
                    {product.inStock
                        ? t("btn.addToCart")
                        : t("product.outOfStock")}
                </Button>
            </CardFooter>
        </Card>
    );
}
