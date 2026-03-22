import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ROUTES } from "@/lib/constants";

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
                className="w-full"
            >
                {slides.map((slide) => {
                    const light = slide.textColor === "light";

                    return (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-[580px] w-full overflow-hidden">
                                {/* Background */}
                                {slide.image ? (
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgTo})`,
                                        }}
                                    />
                                )}

                                {/* Overlay (luôn có để đọc chữ rõ hơn) */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: light
                                            ? "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
                                            : "linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                                    <div className="max-w-xl">
                                        <p
                                            className="mb-3 text-xs font-semibold uppercase tracking-widest"
                                            style={{
                                                color: light
                                                    ? "rgba(255,255,255,0.7)"
                                                    : "rgba(0,0,0,0.5)",
                                            }}
                                        >
                                            Apple Store Vietnam
                                        </p>

                                        <h1
                                            className="mb-4 text-5xl font-semibold md:text-6xl lg:text-7xl"
                                            style={{
                                                color: light
                                                    ? "#ffffff"
                                                    : "#1d1d1f",
                                            }}
                                        >
                                            {slide.title}
                                        </h1>

                                        <p
                                            className="mb-3 text-lg md:text-xl"
                                            style={{
                                                color: light
                                                    ? "rgba(255,255,255,0.9)"
                                                    : "rgba(0,0,0,0.7)",
                                            }}
                                        >
                                            {slide.subtitle}
                                        </p>

                                        <p
                                            className="mb-8 text-sm"
                                            style={{
                                                color: light
                                                    ? "rgba(255,255,255,0.7)"
                                                    : "rgba(0,0,0,0.5)",
                                            }}
                                        >
                                            {slide.description}
                                        </p>

                                        <div className="flex gap-3">
                                            <Link
                                                to={slide.ctaLink}
                                                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:opacity-90"
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

                                            <Link
                                                to={ROUTES.PRODUCTS}
                                                className="rounded-full border px-6 py-3 text-sm font-medium transition hover:opacity-80"
                                                style={{
                                                    borderColor: light
                                                        ? "rgba(255,255,255,0.4)"
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
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}
