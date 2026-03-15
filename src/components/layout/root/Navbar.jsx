import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MegaMenu from "./MegaMenu";
import NavbarActions from "./NavbarActions";
import NavbarMobile from "./NavbarMobile";
import NavbarSearch from "./NavbarSearch";
import { toggleMobileMenu, selectMobileMenuOpen } from "@/store/uiSlice";
import { useScrolled } from "@/hooks/useScrollToTop";
import { CATEGORIES, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const dispatch = useDispatch();
    const mobileOpen = useSelector(selectMobileMenuOpen);
    const isScrolled = useScrolled(10);
    const [searchOpen, setSearchOpen] = useState(false);

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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 814 1000"
                            className="h-6 w-6 fill-foreground"
                        >
                            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-109.2c-52.1-73.6-96.2-187.8-96.2-296.7 0-166.7 108.7-254.8 215.7-254.8 56.6 0 103.7 37.5 139 37.5 33.8 0 86.5-39.5 151.8-39.5 24.4 0 108.2 2.6 168.6 80.6zm-159.5-197.7c30.3-35.7 51.5-85.4 51.5-135.1 0-6.5-.6-13-1.9-18.2-48.7 1.9-106.4 32.5-140.8 73.6-26.8 30.3-52 80-52 130.4 0 7.1 1.3 14.3 1.9 16.5 3.2.6 8.4 1.3 13.6 1.3 43.4 0 98.4-29 127.7-68.5z" />
                        </svg>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {CATEGORIES.map((cat) => (
                            <MegaMenu key={cat.value} category={cat} />
                        ))}
                    </nav>
                </div>

                {/* ── Center — Search bar (khi mở) ── */}
                {searchOpen && (
                    <div className="flex flex-1 items-center gap-2">
                        <NavbarSearch onClose={() => setSearchOpen(false)} />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 rounded-full"
                            onClick={() => setSearchOpen(false)}
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
                    {/* Search toggle button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    <NavbarActions />

                    {/* Mobile menu trigger */}
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
