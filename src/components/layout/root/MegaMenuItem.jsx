import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export default function MegaMenuItem({ product, onClick }) {
    return (
        <Link
            to={ROUTES.PRODUCT_DETAIL(product.slug)}
            onClick={onClick}
            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
        >
            {/* Image */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted/50 p-1">
                <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                    {product.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatPrice(product.price)}
                </p>
                {product.originalPrice &&
                    product.originalPrice > product.price && (
                        <p className="text-[10px] text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </p>
                    )}
            </div>
        </Link>
    );
}
