import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function QuantityInput({
    value = 1,
    min = 1,
    max = 99,
    onChange,
    disabled = false,
    size = "md", // sm | md | lg
    className,
}) {
    const sizes = {
        sm: {
            btn: "h-7 w-7",
            input: "h-7 w-10 text-xs",
            icon: "h-3 w-3",
        },
        md: {
            btn: "h-9 w-9",
            input: "h-9 w-12 text-sm",
            icon: "h-4 w-4",
        },
        lg: {
            btn: "h-11 w-11",
            input: "h-11 w-14 text-base",
            icon: "h-4 w-4",
        },
    };

    const handleDecrease = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrease = () => {
        if (value < max) onChange(value + 1);
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value);
        if (isNaN(newValue)) return;
        if (newValue < min) {
            onChange(min);
            return;
        }
        if (newValue > max) {
            onChange(max);
            return;
        }
        onChange(newValue);
    };

    const handleBlur = (e) => {
        const newValue = parseInt(e.target.value);
        if (isNaN(newValue) || newValue < min) onChange(min);
    };

    return (
        <div
            className={cn(
                "flex items-center overflow-hidden rounded-full border border-border bg-background",
                disabled && "cursor-not-allowed opacity-50",
                className,
            )}
        >
            {/* Decrease button */}
            <Button
                type="button"
                variant="ghost"
                onClick={handleDecrease}
                disabled={disabled || value <= min}
                className={cn(
                    "rounded-none rounded-l-full border-none",
                    sizes[size].btn,
                )}
            >
                <Minus className={sizes[size].icon} />
            </Button>

            {/* Input */}
            <Input
                type="number"
                value={value}
                min={min}
                max={max}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={disabled}
                className={cn(
                    "rounded-none border-none text-center [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                    sizes[size].input,
                )}
            />

            {/* Increase button */}
            <Button
                type="button"
                variant="ghost"
                onClick={handleIncrease}
                disabled={disabled || value >= max}
                className={cn(
                    "rounded-none rounded-r-full border-none",
                    sizes[size].btn,
                )}
            >
                <Plus className={sizes[size].icon} />
            </Button>
        </div>
    );
}
