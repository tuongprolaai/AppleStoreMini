import { cn } from "@/lib/utils";

export default function LoadingScreen({ fullScreen = true, className }) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4",
                fullScreen
                    ? "fixed inset-0 z-50 bg-background"
                    : "h-full w-full py-24",
                className,
            )}
        >
            {/* Apple-style spinner */}
            <div className="relative h-12 w-12">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 rounded-full bg-foreground"
                        style={{
                            transform: `translateX(-50%) rotate(${i * 30}deg)`,
                            transformOrigin: "center 24px",
                            opacity: (i + 1) / 12,
                            animation: `spin-fade 1s linear ${-(12 - i) / 12}s infinite`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
