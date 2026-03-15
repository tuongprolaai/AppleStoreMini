import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileSidebarItem({
    href,
    icon: Icon,
    label,
    end = false,
    onClick,
}) {
    return (
        <NavLink
            to={href}
            end={end}
            onClick={onClick}
            className={({ isActive }) =>
                cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
            }
        >
            {({ isActive }) => (
                <>
                    <span className="flex items-center gap-3">
                        {Icon && (
                            <Icon
                                className={cn(
                                    "h-4 w-4 shrink-0",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground",
                                )}
                            />
                        )}
                        {label}
                    </span>
                    <ChevronRight
                        className={cn(
                            "h-3.5 w-3.5 transition-opacity",
                            isActive ? "opacity-60" : "opacity-30",
                        )}
                    />
                </>
            )}
        </NavLink>
    );
}
