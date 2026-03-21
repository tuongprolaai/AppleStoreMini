import { useTranslation } from "react-i18next";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ReviewForm from "@/features/products/components/ReviewForm";

/**
 * ReviewModal — hiện từ OrderCard khi user click đánh giá sản phẩm
 *
 * Props:
 *   open           — boolean
 *   onOpenChange   — (open: boolean) => void
 *   product        — object sản phẩm cần đánh giá
 *   orderId        — id đơn hàng
 *   existingReview — review đã submit trước đó (nếu có) — dùng để fill form
 *   onSuccess      — (reviewData) => void — callback khi submit thành công
 */
export default function ReviewModal({
    open,
    onOpenChange,
    product,
    orderId,
    existingReview,
    onSuccess,
}) {
    const { t } = useTranslation("product");

    const handleSuccess = (reviewData) => {
        onSuccess?.(reviewData);
        onOpenChange(false);
    };

    const isEditing = !!existingReview;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">
                        {isEditing
                            ? t("review.editReview", {
                                  defaultValue: "Chỉnh sửa đánh giá",
                              })
                            : t("review.writeReview", {
                                  defaultValue: "Đánh giá sản phẩm",
                              })}
                    </DialogTitle>
                </DialogHeader>

                {/* Product info */}
                {product && (
                    <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted p-1">
                            <img
                                src={product.images?.[0] || product.image}
                                alt={product.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <p className="line-clamp-2 text-sm font-medium text-foreground">
                            {product.name}
                        </p>
                    </div>
                )}

                {/* Form — truyền existingReview để fill sẵn nếu đã review */}
                <ReviewForm
                    productId={product?._id || product?.id}
                    orderId={orderId}
                    review={existingReview}
                    onSuccess={handleSuccess}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
