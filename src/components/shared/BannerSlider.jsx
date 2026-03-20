import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ROUTES } from "@/lib/constants";

/**
 * BannerSlider — hero banner toàn màn hình với EffectFade + autoplay
 *
 * Props:
 *   slides — array từ BANNER_SLIDES trong constants.js
 *            mỗi slide: { id, title, subtitle, description, cta, ctaLink,
 *                         image, bgFrom, bgTo, textColor: "light"|"dark" }
 */
export default function BannerSlider({ slides = [] }) {
    if (!slides.length) return null;

    return (
        <section className="relative w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                style={{ minHeight: "580px" }}
                className="banner-swiper w-full"
            >
                {slides.map((slide) => {
                    const light = slide.textColor === "light";

                    return (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="relative flex min-h-[580px] w-full items-center overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
                                }}
                            >
                                {/* Subtle bg image overlay */}
                                {slide.image && (
                                    <img
                                        src={slide.image}
                                        alt=""
                                        aria-hidden
                                        className="absolute inset-0 h-full w-full object-cover opacity-10"
                                    />
                                )}

                                {/* Content */}
                                <div className="section-padding relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 py-16 text-center md:flex-row md:items-center md:gap-16 md:text-left">
                                    {/* Text block */}
                                    <div className="flex-1">
                                        <p
                                            className="mb-3 text-xs font-semibold uppercase tracking-widest"
                                            style={{
                                                color: light
                                                    ? "rgba(255,255,255,0.55)"
                                                    : "rgba(0,0,0,0.4)",
                                            }}
                                        >
                                            Apple Store Vietnam
                                        </p>

                                        <h1
                                            className="mb-4 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
                                            style={{
                                                color: light
                                                    ? "#ffffff"
                                                    : "#1d1d1f",
                                            }}
                                        >
                                            {slide.title}
                                        </h1>

                                        <p
                                            className="mb-3 text-lg font-medium md:text-xl"
                                            style={{
                                                color: light
                                                    ? "rgba(255,255,255,0.85)"
                                                    : "rgba(0,0,0,0.7)",
                                            }}
                                        >
                                            {slide.subtitle}
                                        </p>

                                        <p
                                            className="mb-8 max-w-sm text-sm leading-relaxed"
                                            style={{
                                                color: light
                                                    ? "rgba(255,255,255,0.6)"
                                                    : "rgba(0,0,0,0.5)",
                                            }}
                                        >
                                            {slide.description}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                                            {/* Primary CTA */}
                                            <Link
                                                to={slide.ctaLink}
                                                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                                                style={{
                                                    background: light
                                                        ? "#ffffff"
                                                        : "#1d1d1f",
                                                    color: light
                                                        ? "#1d1d1f"
                                                        : "#ffffff",
                                                }}
                                            >
                                                {slide.cta}
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>

                                            {/* Secondary CTA */}
                                            <Link
                                                to={ROUTES.PRODUCTS}
                                                className="inline-flex items-center rounded-full border px-7 py-3 text-sm font-medium transition-all hover:opacity-80"
                                                style={{
                                                    borderColor: light
                                                        ? "rgba(255,255,255,0.35)"
                                                        : "rgba(0,0,0,0.2)",
                                                    color: light
                                                        ? "#ffffff"
                                                        : "#1d1d1f",
                                                }}
                                            >
                                                Xem tất cả
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Hero product image */}
                                    {slide.image && (
                                        <div className="hidden flex-1 items-center justify-center md:flex">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="max-h-[400px] w-auto object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}
