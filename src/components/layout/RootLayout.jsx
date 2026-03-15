import { Outlet } from "react-router-dom";
import Navbar from "./root/Navbar";
import Footer from "./root/Footer";
import CartDrawer from "@/features/cart/components/CartDrawer";

import ScrollToTop from "@/components/shared/ScrollToTop";

export default function RootLayout() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
                {/* Outlet là nơi React Router sẽ render các trang con (Home, Product,...) */}
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
}
