import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default GuestRoute;
