import { ProductGridSkeleton as SharedGridSkeleton } from "@/components/shared/ProductCardSkeleton";

// Re-export từ shared để features/products có thể import trực tiếp
export default function ProductGridSkeleton({ count = 8, className }) {
    return <SharedGridSkeleton count={count} className={className} />;
}
