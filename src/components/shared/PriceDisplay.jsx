import { cn, formatPrice, calcDiscount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export default function PriceDisplay({
    price,
    originalPrice,
    size = "md", // sm | md | lg | xl
    showBadge = false, // hiện badge % giảm
    showSaved = false, // hiện số tiền tiết kiệm
    className,
}) {
    const { t } = useTranslation();

    const hasDiscount = originalPrice && originalPrice > price;
    const discount = hasDiscount ? calcDiscount(originalPrice, price) : 0;
    const saved = hasDiscount ? originalPrice - price : 0;

    const sizes = {
        sm: {
            current: "text-sm font-medium",
            original: "text-xs",
        },
        md: {
            current: "text-base font-semibold",
            original: "text-sm",
        },
        lg: {
            current: "text-xl font-semibold",
            original: "text-sm",
        },
        xl: {
            current: "text-3xl font-bold",
            original: "text-base",
        },
    };

    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
            {/* Giá hiện tại */}
            <span className={cn("text-foreground", sizes[size].current)}>
                {formatPrice(price)}
            </span>

            {/* Giá gốc bị gạch ngang */}
            {hasDiscount && (
                <span
                    className={cn(
                        "text-muted-foreground line-through",
                        sizes[size].original,
                    )}
                >
                    {formatPrice(originalPrice)}
                </span>
            )}

            {/* Badge % giảm */}
            {hasDiscount && showBadge && (
                <Badge variant="destructive" className="text-xs">
                    -{discount}%
                </Badge>
            )}

            {/* Số tiền tiết kiệm */}
            {hasDiscount && showSaved && (
                <span className="text-xs text-green-600 dark:text-green-400">
                    {t("price.sale")} {formatPrice(saved)}
                </span>
            )}
        </div>
    );
}
