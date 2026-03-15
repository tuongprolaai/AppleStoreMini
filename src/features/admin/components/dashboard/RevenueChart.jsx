import { useTranslation } from "react-i18next";
import { useGetRevenueStatsQuery } from "@/store/api/ordersApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PERIODS = [
    { value: "week", labelKey: "dashboard.week" },
    { value: "month", labelKey: "dashboard.month" },
    { value: "year", labelKey: "dashboard.year" },
];

export default function RevenueChart() {
    const { t } = useTranslation("admin");
    const [period, setPeriod] = useState("month");

    const { data, isLoading } = useGetRevenueStatsQuery({ period });
    const chartData = data?.data?.chart || [];

    const maxValue = Math.max(...chartData.map((d) => d.revenue || 0), 1);

    if (isLoading) {
        return (
            <div className="space-y-3">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-8 w-16 rounded-full" />
                    ))}
                </div>
                <Skeleton className="h-[280px] w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Period selector */}
            <div className="flex gap-1.5">
                {PERIODS.map((p) => (
                    <Button
                        key={p.value}
                        variant="ghost"
                        size="sm"
                        onClick={() => setPeriod(p.value)}
                        className={cn(
                            "rounded-full text-xs",
                            period === p.value
                                ? "bg-foreground text-background hover:bg-foreground/90"
                                : "text-muted-foreground",
                        )}
                    >
                        {t(p.labelKey)}
                    </Button>
                ))}
            </div>

            {/* Chart */}
            {chartData.length === 0 ? (
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                        {t("table.noData")}
                    </p>
                </div>
            ) : (
                <div className="h-[280px]">
                    <div className="flex h-full items-end gap-1.5">
                        {chartData.map((item, index) => {
                            const heightPct = (item.revenue / maxValue) * 100;

                            return (
                                <div
                                    key={index}
                                    className="group relative flex flex-1 flex-col items-center gap-1"
                                >
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 hidden rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md group-hover:block">
                                        <p className="font-medium text-foreground">
                                            {formatPrice(item.revenue)}
                                        </p>
                                        <p className="text-muted-foreground">
                                            {item.label}
                                        </p>
                                    </div>

                                    {/* Bar */}
                                    <div className="w-full flex-1 rounded-t-md bg-muted/30">
                                        <div
                                            className="w-full rounded-t-md bg-foreground/80 transition-all duration-500 group-hover:bg-foreground"
                                            style={{
                                                height: `${Math.max(heightPct, 2)}%`,
                                            }}
                                        />
                                    </div>

                                    {/* Label */}
                                    <span className="text-[10px] text-muted-foreground">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Summary */}
            {data?.data && (
                <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            {t("dashboard.totalRevenue")}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {formatPrice(data.data.totalRevenue || 0)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            {t("dashboard.totalOrders")}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {data.data.totalOrders || 0}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            {t("dashboard.vsLastMonth")}
                        </p>
                        <p
                            className={cn(
                                "mt-0.5 text-sm font-semibold",
                                (data.data.revenueChange || 0) >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-500",
                            )}
                        >
                            {(data.data.revenueChange || 0) >= 0 ? "+" : ""}
                            {data.data.revenueChange || 0}%
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
