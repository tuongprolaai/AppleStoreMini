import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    actionHref,
    className,
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center",
                className,
            )}
        >
            {/* Icon */}
            {icon && (
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <span className="text-4xl text-muted-foreground">
                        {icon}
                    </span>
                </div>
            )}

            {/* Title */}
            <h3 className="mb-2 text-lg font-medium text-foreground">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            {/* Action button */}
            {actionLabel && (onAction || actionHref) && (
                <Button
                    onClick={onAction}
                    asChild={!!actionHref}
                    className="rounded-full"
                >
                    {actionHref ? (
                        <a href={actionHref}>{actionLabel}</a>
                    ) : (
                        actionLabel
                    )}
                </Button>
            )}
        </div>
    );
}
