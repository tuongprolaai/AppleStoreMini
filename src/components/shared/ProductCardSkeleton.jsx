import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProductCardSkeleton({ className }) {
    return (
        <Card
            className={cn(
                "overflow-hidden border-transparent bg-muted/30",
                className,
            )}
        >
            {/* Image skeleton */}
            <div className="aspect-square p-6">
                <Skeleton className="h-full w-full rounded-lg" />
            </div>

            {/* Info skeleton */}
            <CardContent className="flex flex-col items-center gap-2 p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
            </CardContent>

            {/* Button skeleton */}
            <CardFooter className="p-4 pt-0">
                <Skeleton className="h-9 w-full rounded-full" />
            </CardFooter>
        </Card>
    );
}

// Grid skeleton — dùng khi loading danh sách sản phẩm
export function ProductGridSkeleton({ count = 8, className }) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className,
            )}
        >
            {[...Array(count)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
