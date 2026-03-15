import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import QuantityInput from "@/components/shared/QuantityInput";
import PriceDisplay from "@/components/shared/PriceDisplay";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { ROUTES } from "@/lib/constants";

export default function CartTableItem({ item, index, isLast }) {
    const { t } = useTranslation("cart");
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(
            removeFromCart({
                productId: item.product.id,
                selectedColor: item.selectedColor,
                selectedStorage: item.selectedStorage,
            }),
        );
    };

    const handleUpdateQty = (quantity) => {
        dispatch(
            updateQuantity({
                productId: item.product.id,
                selectedColor: item.selectedColor,
                selectedStorage: item.selectedStorage,
                quantity,
            }),
        );
    };

    return (
        <div>
            <div className="grid grid-cols-12 gap-4">
                {/* Image + Info */}
                <div className="col-span-12 flex gap-4 md:col-span-6">
                    <Link
                        to={ROUTES.PRODUCT_DETAIL(item.product.slug)}
                        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted/30 p-2 transition-opacity hover:opacity-80"
                    >
                        <img
                            src={item.product.images?.[0] || item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-contain"
                        />
                    </Link>
                    <div className="min-w-0 flex-1">
                        <Link
                            to={ROUTES.PRODUCT_DETAIL(item.product.slug)}
                            className="line-clamp-2 text-sm font-medium text-foreground hover:text-apple-blue"
                        >
                            {item.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {item.selectedColor && (
                                <span>
                                    {t("item.color")}: {item.selectedColor}
                                </span>
                            )}
                            {item.selectedColor && item.selectedStorage && (
                                <span> · </span>
                            )}
                            {item.selectedStorage && (
                                <span>
                                    {t("item.storage")}: {item.selectedStorage}
                                </span>
                            )}
                        </p>
                        {/* Remove — mobile */}
                        <button
                            onClick={handleRemove}
                            className="mt-2 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive md:hidden"
                        >
                            <Trash2 className="h-3 w-3" />
                            {t("item.remove")}
                        </button>
                    </div>
                </div>

                {/* Price — desktop */}
                <div className="col-span-2 hidden items-center justify-center md:flex">
                    <PriceDisplay
                        price={item.product.price}
                        originalPrice={item.product.originalPrice}
                        size="sm"
                    />
                </div>

                {/* Quantity */}
                <div className="col-span-7 flex items-center md:col-span-2 md:justify-center">
                    <QuantityInput
                        value={item.quantity}
                        min={1}
                        max={item.product.stock || 99}
                        size="sm"
                        onChange={handleUpdateQty}
                    />
                </div>

                {/* Total + Remove — desktop */}
                <div className="col-span-5 flex items-center justify-end gap-3 md:col-span-2">
                    <PriceDisplay
                        price={item.product.price * item.quantity}
                        size="sm"
                    />
                    <button
                        onClick={handleRemove}
                        className="hidden text-muted-foreground transition-colors hover:text-destructive md:block"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {!isLast && <Separator className="mt-6" />}
        </div>
    );
}
