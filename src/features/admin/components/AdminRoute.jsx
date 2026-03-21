import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectIsAdmin } from "@/store/authSlice";
import { ROUTES } from "@/lib/constants";

export default function AdminRoute({ children }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.ADMIN_LOGIN}
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    if (!isAdmin) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return children ? children : <Outlet />;
}
