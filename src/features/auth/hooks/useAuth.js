import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} from "@/store/api/authApi";
import {
    selectCurrentUser,
    selectIsAuthenticated,
    selectIsAdmin,
    logout as logoutAction,
} from "@/store/authSlice";
import { clearCart, selectCartItems } from "@/store/cartSlice";
import { useSyncCartMutation } from "@/store/api/cartApi";
import { ROUTES } from "@/lib/constants";

export function useAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const cartItems = useSelector(selectCartItems);

    const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
    const [registerMutation, { isLoading: isRegisterLoading }] =
        useRegisterMutation();
    const [logoutMutation, { isLoading: isLogoutLoading }] =
        useLogoutMutation();
    const [syncCart] = useSyncCartMutation();

    const login = async (credentials) => {
        try {
            await loginMutation(credentials).unwrap();

            // Sync giỏ hàng local lên server sau khi login
            if (cartItems.length > 0) {
                try {
                    await syncCart(
                        cartItems.map((item) => ({
                            product: item.product._id || item.product.id,
                            quantity: item.quantity,
                            selectedColor: item.selectedColor,
                            selectedStorage: item.selectedStorage,
                        })),
                    );
                } catch {
                    // Không throw — sync thất bại không ảnh hưởng login
                }
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error?.data?.message || "Đăng nhập thất bại",
            };
        }
    };

    const register = async (data) => {
        try {
            await registerMutation(data).unwrap();
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error?.data?.message || "Đăng ký thất bại",
            };
        }
    };

    const logoutUser = async () => {
        try {
            await logoutMutation().unwrap();
        } catch {
            dispatch(logoutAction());
        } finally {
            dispatch(clearCart());
            navigate(ROUTES.HOME);
        }
    };

    return {
        user,
        isAuthenticated,
        isAdmin,
        isLoginLoading,
        isRegisterLoading,
        isLogoutLoading,
        login,
        register,
        logout: logoutUser,
    };
}
