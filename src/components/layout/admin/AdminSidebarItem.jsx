import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebarItem({
    href,
    icon: Icon,
    label,
    end = false,
    onClick,
    badge,
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

                    <span className="flex items-center gap-1.5">
                        {/* Badge — số lượng thông báo */}
                        {badge > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                                {badge > 99 ? "99+" : badge}
                            </span>
                        )}
                        <ChevronRight
                            className={cn(
                                "h-3.5 w-3.5 transition-opacity",
                                isActive ? "opacity-60" : "opacity-30",
                            )}
                        />
                    </span>
                </>
            )}
        </NavLink>
    );
}
