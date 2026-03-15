import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectIsAdmin } from "@/store/authSlice";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function AdminRoute({ children }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const location = useLocation();

    // Chưa đăng nhập → về trang login, lưu lại url để redirect sau khi login
    if (!isAuthenticated) {
        return (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
        );
    }

    // Đã đăng nhập nhưng không phải admin → về trang chủ + thông báo
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}
