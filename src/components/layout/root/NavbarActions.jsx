import NavbarCartButton from "./NavbarCartButton";
import NavbarUserMenu from "./NavbarUserMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/lib/constants";

export default function NavbarActions() {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-0.5">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Wishlist */}
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
            >
                <Link to={ROUTES.WISHLIST}>
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">{t("nav.wishlist")}</span>
                </Link>
            </Button>

            {/* Cart */}
            <NavbarCartButton />

            {/* User */}
            <NavbarUserMenu />
        </div>
    );
}
