import { useTranslation } from "react-i18next";
import {
    useGetFeaturedProductsQuery,
    useGetNewProductsQuery,
} from "@/store/api/productsApi";
import SectionTitle from "@/components/shared/SectionTitle";
import ProductCard from "@/components/shared/ProductCard";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { ROUTES, CATEGORIES } from "@/lib/constants";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import iphoneImg from "@/assets/images/categories/iphone.jpg";
import ipadImg from "@/assets/images/categories/ipad.jpg";
import macImg from "@/assets/images/categories/mac.jpg";
import watchImg from "@/assets/images/categories/watch.jpg";
import airpodsImg from "@/assets/images/categories/airpods.jpg";

import heroIphoneImg from "@/assets/images/hero/hero-iphone.jpg";

export default function HomePage() {
    const { t } = useTranslation("product");

    const categoryImages = {
        iphone: iphoneImg,
        ipad: ipadImg,
        mac: macImg,
        watch: watchImg,
        airpods: airpodsImg,
    };

    const { data: featuredData, isLoading: isFeaturedLoading } =
        useGetFeaturedProductsQuery(8);

    const { data: newData, isLoading: isNewLoading } =
        useGetNewProductsQuery(4);

    const featuredProducts = featuredData?.data || [];
    const newProducts = newData?.data || [];

    return (
        <div className="flex flex-col">
            {/* ── Hero ── */}
            <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-b from-muted/50 to-background px-4 py-24">
                <div className="flex w-full max-w-6xl items-center gap-12">
                    {/* Text */}
                    <div className="flex-1 text-center md:text-left">
                        <p className="mb-3 text-sm font-medium text-apple-blue">
                            Apple Store Vietnam
                        </p>
                        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                            Trải nghiệm tuyệt vời
                            <br />
                            <span className="text-muted-foreground">
                                trong tầm tay bạn
                            </span>
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                            <Link
                                to={ROUTES.PRODUCTS}
                                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
                            >
                                {t("home.discoverMore")}
                            </Link>
                            <Link
                                to={`${ROUTES.PRODUCTS}?category=iphone`}
                                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                iPhone mới nhất
                            </Link>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div className="hidden flex-1 md:flex md:justify-center">
                        <img
                            src={heroIphoneImg}
                            alt="iPhone"
                            className="max-h-[480px] w-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* ── Shop by category ── */}
            <section className="section-padding section-y">
                <SectionTitle
                    title={t("home.shopByCategory")}
                    align="center"
                    className="mb-10"
                />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.value}
                            to={cat.href}
                            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
                        >
                            <div className="h-20 w-20 overflow-hidden rounded-xl bg-muted">
                                <img
                                    src={categoryImages[cat.value]}
                                    alt={cat.label}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                {cat.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Featured products ── */}
            <section className="section-padding section-y bg-muted/30">
                <SectionTitle
                    title={t("home.featured")}
                    subtitle="Nổi bật"
                    viewAllHref={ROUTES.PRODUCTS}
                    className="mb-8"
                />
                {isFeaturedLoading ? (
                    <ProductGridSkeleton count={8} />
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* ── New arrivals ── */}
            <section className="section-padding section-y">
                <SectionTitle
                    title={t("home.newest")}
                    subtitle="Mới nhất"
                    viewAllHref={`${ROUTES.PRODUCTS}?sort=newest`}
                    className="mb-8"
                />
                {isNewLoading ? (
                    <ProductGridSkeleton count={4} />
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {newProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* ── Banner CTA ── */}
            <section className="section-padding py-24 text-center">
                <div className="mx-auto max-w-xl">
                    <h2 className="mb-4 text-3xl font-semibold text-foreground">
                        Trợ lý cá nhân của bạn
                    </h2>
                    <p className="mb-8 text-muted-foreground">
                        Tư vấn miễn phí, giao hàng tận nơi, bảo hành chính hãng.
                    </p>
                    <Link
                        to={ROUTES.PRODUCTS}
                        className="rounded-full bg-apple-blue px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                    >
                        Mua sắm ngay
                    </Link>
                </div>
            </section>
        </div>
    );
}
