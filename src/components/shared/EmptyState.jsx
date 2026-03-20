import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function EmptyState({
    icon: Icon,
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
                "flex flex-col items-center justify-center px-4 py-16 text-center",
                className,
            )}
        >
            {/* Icon */}
            {Icon && (
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-8 w-8 text-muted-foreground" />
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

            {/* Action */}
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
