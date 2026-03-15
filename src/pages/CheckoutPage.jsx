import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { useCreateOrderMutation } from "@/store/api/ordersApi";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/shared/EmptyState";
import PriceDisplay from "@/components/shared/PriceDisplay";
import CheckoutStepper from "@/features/checkout/components/CheckoutStepper";
import AddressStep from "@/features/checkout/components/AddressStep";
import PaymentStep from "@/features/checkout/components/PaymentStep";
import ConfirmStep from "@/features/checkout/components/ConfirmStep";
import OrderSuccess from "@/features/checkout/components/OrderSuccess";
import { formatPrice } from "@/lib/utils";
import { ROUTES, SHIPPING } from "@/lib/constants";
import { toast } from "sonner";

const STEPS = ["address", "payment", "confirm"];

export default function CheckoutPage() {
    const { t } = useTranslation("checkout");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const [currentStep, setCurrentStep] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const [createdOrder, setCreatedOrder] = useState(null);
    const [checkoutData, setCheckoutData] = useState({
        addressId: null,
        address: null,
        paymentMethod: null,
    });

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const shippingFee =
        total >= SHIPPING.FREE_THRESHOLD ? 0 : SHIPPING.DEFAULT_FEE;
    const grandTotal = total + shippingFee;

    // ── Step handlers ──────────────────────────────────
    const handleAddressNext = (data) => {
        setCheckoutData((prev) => ({ ...prev, ...data }));
        setCurrentStep(1);
    };

    const handlePaymentNext = (data) => {
        setCheckoutData((prev) => ({ ...prev, ...data }));
        setCurrentStep(2);
    };

    const handleBack = () => {
        setCurrentStep((s) => Math.max(0, s - 1));
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await createOrder({
                addressId: checkoutData.addressId,
                paymentMethod: checkoutData.paymentMethod,
                items: items.map((item) => ({
                    productId: item.product._id || item.product.id,
                    quantity: item.quantity,
                    selectedColor: item.selectedColor,
                    selectedStorage: item.selectedStorage,
                })),
                note: checkoutData.note,
            }).unwrap();

            setCreatedOrder(response.data);
            dispatch(clearCart());
            setIsSuccess(true);
        } catch (error) {
            toast.error(error?.data?.message || t("error.placeOrderFailed"));
        }
    };

    // ── Empty cart ─────────────────────────────────────
    if (items.length === 0 && !isSuccess) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <EmptyState
                    icon="🛒"
                    title={t("cart.empty", { ns: "cart" })}
                    description={t("cart.emptyDesc", { ns: "cart" })}
                    actionLabel={t("btn.continueShopping", { ns: "common" })}
                    actionHref={ROUTES.PRODUCTS}
                />
            </div>
        );
    }

    // ── Success ────────────────────────────────────────
    if (isSuccess && createdOrder) {
        return <OrderSuccess order={createdOrder} />;
    }

    return (
        <div className="mx-auto max-w-5xl">
            {/* Back to cart */}
            <Button
                variant="ghost"
                size="sm"
                className="mb-6 rounded-full"
                asChild
            >
                <Link to={ROUTES.CART}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {t("cart.title", { ns: "cart" })}
                </Link>
            </Button>

            {/* Stepper */}
            <CheckoutStepper currentStep={currentStep} className="mb-8" />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                {/* ── Left — Steps ── */}
                <div className="min-w-0 flex-1">
                    {currentStep === 0 && (
                        <AddressStep
                            defaultData={checkoutData}
                            onNext={handleAddressNext}
                        />
                    )}
                    {currentStep === 1 && (
                        <PaymentStep
                            defaultData={checkoutData}
                            onNext={handlePaymentNext}
                            onBack={handleBack}
                        />
                    )}
                    {currentStep === 2 && (
                        <ConfirmStep
                            checkoutData={checkoutData}
                            items={items}
                            total={total}
                            shippingFee={shippingFee}
                            grandTotal={grandTotal}
                            onPlaceOrder={handlePlaceOrder}
                            onBack={handleBack}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                {/* ── Right — Order summary ── */}
                <div className="w-full shrink-0 lg:w-80">
                    <div className="sticky top-6 rounded-2xl border border-border bg-card p-5">
                        <h3 className="mb-4 text-sm font-medium text-foreground">
                            {t("confirm.orderSummary")}
                        </h3>

                        {/* Items */}
                        <div className="mb-4 max-h-60 space-y-3 overflow-y-auto">
                            {items.map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted/30 p-1">
                                        <img
                                            src={
                                                item.product.images?.[0] ||
                                                item.product.image
                                            }
                                            alt={item.product.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-medium text-foreground">
                                            {item.product.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.selectedColor && (
                                                <span>
                                                    {item.selectedColor}
                                                </span>
                                            )}
                                            {item.selectedStorage && (
                                                <span>
                                                    {" "}
                                                    · {item.selectedStorage}
                                                </span>
                                            )}
                                        </p>
                                        <div className="mt-0.5 flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">
                                                x{item.quantity}
                                            </span>
                                            <span className="text-xs font-medium">
                                                {formatPrice(
                                                    item.product.price *
                                                        item.quantity,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="mb-4" />

                        {/* Totals */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    {t("confirm.subtotal")}
                                </span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    {t("confirm.shipping")}
                                </span>
                                <span
                                    className={
                                        shippingFee === 0
                                            ? "text-green-600 dark:text-green-400"
                                            : ""
                                    }
                                >
                                    {shippingFee === 0
                                        ? t("confirm.freeShipping")
                                        : formatPrice(shippingFee)}
                                </span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">
                                {t("confirm.total")}
                            </span>
                            <PriceDisplay price={grandTotal} size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
