import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({
    rating = 0,
    maxStars = 5,
    size = "md", // sm | md | lg
    showCount = false,
    count = 0,
    interactive = false,
    onChange,
    className,
}) {
    const sizes = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    const handleClick = (value) => {
        if (interactive && onChange) onChange(value);
    };

    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            {/* Stars */}
            <div className="flex items-center gap-0.5">
                {[...Array(maxStars)].map((_, i) => {
                    const value = i + 1;
                    const filled = value <= Math.floor(rating);
                    const partial =
                        !filled && value - 1 < rating && rating < value;
                    const fillPct = partial ? (rating - i) * 100 : 0;

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleClick(value)}
                            disabled={!interactive}
                            className={cn(
                                "relative",
                                interactive &&
                                    "cursor-pointer transition-transform hover:scale-110",
                                !interactive && "cursor-default",
                            )}
                        >
                            {/* Background star — empty */}
                            <Star
                                className={cn(
                                    sizes[size],
                                    "text-muted-foreground/30",
                                )}
                            />

                            {/* Foreground star — filled */}
                            {(filled || partial) && (
                                <span
                                    className="absolute inset-0 overflow-hidden"
                                    style={{
                                        width: filled ? "100%" : `${fillPct}%`,
                                    }}
                                >
                                    <Star
                                        className={cn(
                                            sizes[size],
                                            "fill-amber-400 text-amber-400",
                                        )}
                                    />
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Rating number + count */}
            {showCount && (
                <span className={cn("text-muted-foreground", textSizes[size])}>
                    <span className="font-medium text-foreground">
                        {rating.toFixed(1)}
                    </span>
                    {count > 0 && <span className="ml-1">({count})</span>}
                </span>
            )}
        </div>
    );
}
