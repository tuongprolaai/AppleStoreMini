import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "@/components/layout/RootLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import CheckoutLayout from "@/components/layout/CheckoutLayout";
import ProfileLayout from "@/components/layout/ProfileLayout";

// Guards
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import AdminRoute from "@/features/auth/components/AdminRoute";

// Pages — public
import HomePage from "@/pages/HomePage";
import ProductListPage from "@/pages/ProductListPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import SearchPage from "@/pages/SearchPage";
import WishlistPage from "@/pages/WishlistPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import WarrantyPage from "@/pages/WarrantyPage";
import ReturnPolicyPage from "@/pages/ReturnPolicyPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";

// Pages — auth
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";

// Pages — checkout
import CheckoutPage from "@/pages/CheckoutPage";

// Pages — profile
import ProfilePage from "@/pages/ProfilePage";
import OrderHistoryPage from "@/pages/OrderHistoryPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import AddressBookPage from "@/pages/AddressBookPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

// Pages — admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProductList from "@/pages/admin/AdminProductList";
import AdminProductCreate from "@/pages/admin/AdminProductCreate";
import AdminProductEdit from "@/pages/admin/AdminProductEdit";
import AdminOrderList from "@/pages/admin/AdminOrderList";
import AdminOrderDetail from "@/pages/admin/AdminOrderDetail";
import AdminUserList from "@/pages/admin/AdminUserList";
import AdminUserDetail from "@/pages/admin/AdminUserDetail";

export const router = createBrowserRouter([
    // ── Public ───────────────────────────────────────────
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "products", element: <ProductListPage /> },
            { path: "products/:slug", element: <ProductDetailPage /> },
            { path: "cart", element: <CartPage /> },
            { path: "search", element: <SearchPage /> },
            { path: "wishlist", element: <WishlistPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "warranty", element: <WarrantyPage /> },
            { path: "return", element: <ReturnPolicyPage /> },
            { path: "privacy", element: <PrivacyPage /> },
            { path: "terms", element: <TermsPage /> },
        ],
    },

    // ── Auth ─────────────────────────────────────────────
    {
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "forgot-password", element: <ForgotPasswordPage /> },
            { path: "reset-password/:token", element: <ResetPasswordPage /> },
        ],
    },

    // ── Checkout ─────────────────────────────────────────
    {
        element: (
            <ProtectedRoute>
                <CheckoutLayout />
            </ProtectedRoute>
        ),
        children: [{ path: "checkout", element: <CheckoutPage /> }],
    },

    // ── Profile ──────────────────────────────────────────
    {
        path: "profile",
        element: (
            <ProtectedRoute>
                <ProfileLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <ProfilePage /> },
            { path: "orders", element: <OrderHistoryPage /> },
            { path: "orders/:id", element: <OrderDetailPage /> },
            { path: "addresses", element: <AddressBookPage /> },
            { path: "change-password", element: <ChangePasswordPage /> },
        ],
    },

    // ── Admin ─────────────────────────────────────────────
    {
        path: "admin",
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "products", element: <AdminProductList /> },
            { path: "products/create", element: <AdminProductCreate /> },
            { path: "products/:id/edit", element: <AdminProductEdit /> },
            { path: "orders", element: <AdminOrderList /> },
            { path: "orders/:id", element: <AdminOrderDetail /> },
            { path: "users", element: <AdminUserList /> },
            { path: "users/:id", element: <AdminUserDetail /> },
        ],
    },

    // ── 404 ───────────────────────────────────────────────
    { path: "*", element: <NotFoundPage /> },
]);
