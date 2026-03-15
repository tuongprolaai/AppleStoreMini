import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export default function OrderCard({ order }) {
    const { t } = useTranslation("order");

    // Hiển thị tối đa 3 ảnh sản phẩm, còn lại hiện +n
    const visibleItems = order.items?.slice(0, 3) || [];
    const remainCount = (order.items?.length || 0) - visibleItems.length;

    return (
        <div className="rounded-xl border border-border bg-card transition-colors hover:border-border/80">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                        #{order.code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatDateTime(order.createdAt)}
                    </span>
                </div>
                <OrderStatusBadge status={order.status} />
            </div>

            <Separator />

            {/* Items */}
            <div className="flex items-center gap-3 px-4 py-3">
                {/* Product images */}
                <div className="flex items-center gap-2">
                    {visibleItems.map((item, index) => (
                        <div
                            key={index}
                            className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted/30 p-1.5"
                        >
                            <img
                                src={
                                    item.product?.images?.[0] ||
                                    item.product?.image
                                }
                                alt={item.product?.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    ))}

                    {/* +n more */}
                    {remainCount > 0 && (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted/30 text-sm font-medium text-muted-foreground">
                            +{remainCount}
                        </div>
                    )}
                </div>

                {/* Item names */}
                <div className="min-w-0 flex-1">
                    {visibleItems.map((item, index) => (
                        <p
                            key={index}
                            className="truncate text-sm text-foreground"
                        >
                            {item.product?.name}
                            {item.selectedStorage && (
                                <span className="ml-1 text-xs text-muted-foreground">
                                    · {item.selectedStorage}
                                </span>
                            )}
                        </p>
                    ))}
                    {remainCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {t("pagination.and", { ns: "common" })}{" "}
                            {remainCount} {t("item.quantity")}
                        </p>
                    )}
                </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                {/* Total */}
                <div className="text-sm">
                    <span className="text-muted-foreground">
                        {t("detail.grandTotal")}:{" "}
                    </span>
                    <span className="font-semibold text-foreground">
                        {formatPrice(order.totalAmount)}
                    </span>
                </div>

                {/* View detail */}
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    asChild
                >
                    <Link to={ROUTES.ORDER_DETAIL(order.id)}>
                        {t("detail.orderInfo")}
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
