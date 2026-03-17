import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MegaMenu from "./MegaMenu";
import NavbarActions from "./NavbarActions";
import NavbarMobile from "./NavbarMobile";
import NavbarSearch from "./NavbarSearch";

import {
    toggleMobileMenu,
    selectMobileMenuOpen,
    toggleSearch,
    selectSearchOpen,
} from "@/store/uiSlice";

import { useScrolled } from "@/hooks/useScrollToTop";
import { CATEGORIES, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// import logo SVG
import appleLogo from "@/assets/icons/apple.svg";

export default function Navbar() {
    const dispatch = useDispatch();

    const mobileOpen = useSelector(selectMobileMenuOpen);
    const searchOpen = useSelector(selectSearchOpen);

    const isScrolled = useScrolled(10);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-all duration-200",
                isScrolled
                    ? "border-border bg-background/90 backdrop-blur-md"
                    : "border-transparent bg-background/60 backdrop-blur-sm",
            )}
        >
            <div className="section-padding flex h-14 items-center justify-between gap-4">
                {/* ── Left — Logo + Nav ── */}
                <div
                    className={cn(
                        "flex items-center gap-8 transition-all duration-200",
                        searchOpen && "hidden md:flex",
                    )}
                >
                    <Link
                        to={ROUTES.HOME}
                        className="flex shrink-0 items-center transition-opacity hover:opacity-70"
                    >
                        <img
                            src={appleLogo}
                            alt="Apple"
                            className="h-6 w-6 dark:invert"
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {CATEGORIES.map((cat) => (
                            <MegaMenu key={cat.value} category={cat} />
                        ))}
                    </nav>
                </div>

                {/* ── Center — Search bar ── */}
                {searchOpen && (
                    <div className="flex flex-1 items-center gap-2">
                        <NavbarSearch
                            onClose={() => dispatch(toggleSearch(false))}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 rounded-full"
                            aria-label="Đóng tìm kiếm"
                            onClick={() => dispatch(toggleSearch(false))}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                {/* ── Right — Actions ── */}
                <div
                    className={cn(
                        "flex items-center gap-0.5",
                        searchOpen && "hidden md:flex",
                    )}
                >
                    {/* Search button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        aria-label="Tìm kiếm"
                        onClick={() => {
                            dispatch(toggleSearch(true));
                            dispatch(toggleMobileMenu(false));
                        }}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    <NavbarActions />

                    {/* Mobile menu */}
                    <Sheet
                        open={mobileOpen}
                        onOpenChange={(open) =>
                            dispatch(toggleMobileMenu(open))
                        }
                    >
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full md:hidden"
                                aria-label="Mở menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-72 p-0">
                            <NavbarMobile />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
