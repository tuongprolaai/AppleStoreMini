import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetMeQuery,
    useLoginWithGoogleMutation,
} from "@/store/api/authApi";
import {
    setCredentials,
    setUser,
    logout as logoutAction,
    selectCurrentUser,
    selectIsAuthenticated,
    selectIsAdmin,
} from "@/store/authSlice";
import { clearCart } from "@/store/cartSlice";
import { clearWishlist } from "@/store/wishlistSlice";
import { toggleAuthModal } from "@/store/uiSlice";
import { ROUTES } from "@/lib/constants";

export function useAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation("auth");

    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);

    const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
    const [registerMutation, { isLoading: isRegisterLoading }] =
        useRegisterMutation();
    const [logoutMutation, { isLoading: isLogoutLoading }] =
        useLogoutMutation();
    const [googleLoginMutation, { isLoading: isGoogleLoginLoading }] =
        useLoginWithGoogleMutation();

    // Tự động fetch thông tin user nếu đã có token
    useGetMeQuery(undefined, { skip: !isAuthenticated });

    // ── Login ──────────────────────────────────────────
    const login = async (credentials) => {
        try {
            const response = await loginMutation(credentials).unwrap();
            dispatch(
                setCredentials({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                }),
            );

            // Redirect về trang trước đó nếu có
            const from = location.state?.from || ROUTES.HOME;
            navigate(from, { replace: true });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error?.data?.message || t("login.failed"),
            };
        }
    };

    // ── Register ───────────────────────────────────────
    const register = async (userData) => {
        try {
            const response = await registerMutation(userData).unwrap();
            dispatch(
                setCredentials({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                }),
            );
            navigate(ROUTES.HOME, { replace: true });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error?.data?.message || t("register.emailExists"),
            };
        }
    };

    // ── Logout ─────────────────────────────────────────
    const logout = async () => {
        try {
            await logoutMutation().unwrap();
        } catch {
        } finally {
            dispatch(logoutAction());
            dispatch(clearCart());
            dispatch(clearWishlist());
            navigate(ROUTES.HOME, { replace: true });
        }
    };

    // ── Login with Google ──────────────────────────────
    const loginWithGoogle = async (tokenId) => {
        try {
            const response = await googleLoginMutation(tokenId).unwrap();
            dispatch(
                setCredentials({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                }),
            );

            const from = location.state?.from || ROUTES.HOME;
            navigate(from, { replace: true });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error?.data?.message || t("login.failed"),
            };
        }
    };

    // ── Update user info ───────────────────────────────
    const updateUser = (userData) => {
        dispatch(setUser(userData));
    };

    // ── Open auth modal ────────────────────────────────
    const openAuthModal = () => {
        dispatch(toggleAuthModal(true));
    };

    return {
        // State
        user,
        isAuthenticated,
        isAdmin,

        // Actions
        login,
        register,
        logout,
        loginWithGoogle,
        updateUser,
        openAuthModal,

        // Loading states
        isLoginLoading,
        isRegisterLoading,
        isLogoutLoading,
        isGoogleLoginLoading,
    };
}
