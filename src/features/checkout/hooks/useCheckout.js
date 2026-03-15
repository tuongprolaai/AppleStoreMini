import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCreateOrderMutation } from "@/store/api/ordersApi";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { useToast } from "@/components/ui/use-toast";
import { ROUTES, SHIPPING } from "@/lib/constants";

export function useCheckout() {
    const { t } = useTranslation("checkout");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const [currentStep, setCurrentStep] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const [createdOrder, setCreatedOrder] = useState(null);
    const [checkoutData, setCheckoutData] = useState({
        addressId: null,
        address: null,
        paymentMethod: null,
        note: "",
    });

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    // ── Computed ───────────────────────────────────────
    const shippingFee =
        total >= SHIPPING.FREE_THRESHOLD ? 0 : SHIPPING.DEFAULT_FEE;

    const grandTotal = total + shippingFee;

    const canProceed = items.length > 0;

    // ── Step navigation ────────────────────────────────
    const goNext = () => setCurrentStep((s) => Math.min(s + 1, 2));
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

    const handleAddressNext = (data) => {
        setCheckoutData((prev) => ({ ...prev, ...data }));
        goNext();
    };

    const handlePaymentNext = (data) => {
        setCheckoutData((prev) => ({ ...prev, ...data }));
        goNext();
    };

    // ── Place order ────────────────────────────────────
    const handlePlaceOrder = async () => {
        if (!checkoutData.paymentMethod) {
            toast({
                title: t("error.placeOrderFailed"),
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await createOrder({
                addressId: checkoutData.addressId,
                paymentMethod: checkoutData.paymentMethod,
                note: checkoutData.note,
                items: items.map((item) => ({
                    productId: item.product._id || item.product.id,
                    quantity: item.quantity,
                    selectedColor: item.selectedColor || "",
                    selectedStorage: item.selectedStorage || "",
                })),
            }).unwrap();

            setCreatedOrder(response.data);
            dispatch(clearCart());
            setIsSuccess(true);
        } catch (error) {
            toast({
                title: t("error.placeOrderFailed"),
                description: error?.data?.message,
                variant: "destructive",
            });
        }
    };

    // ── Reset ──────────────────────────────────────────
    const reset = () => {
        setCurrentStep(0);
        setIsSuccess(false);
        setCreatedOrder(null);
        setCheckoutData({
            addressId: null,
            address: null,
            paymentMethod: null,
            note: "",
        });
    };

    return {
        // State
        currentStep,
        isSuccess,
        createdOrder,
        checkoutData,
        items,
        total,
        shippingFee,
        grandTotal,
        canProceed,
        isLoading,

        // Actions
        handleAddressNext,
        handlePaymentNext,
        handlePlaceOrder,
        goBack,
        reset,
    };
}
