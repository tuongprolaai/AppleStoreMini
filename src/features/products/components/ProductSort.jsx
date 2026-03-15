import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";

export default function ProductSort({ value, onChange }) {
    const { t } = useTranslation("product");

    return (
        <Select value={value || "featured"} onValueChange={onChange}>
            <SelectTrigger className="w-48 rounded-full">
                <SelectValue placeholder={t("sort.label")} />
            </SelectTrigger>
            <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {t(
                            `sort.${
                                opt.value === "featured"
                                    ? "featured"
                                    : opt.value === "newest"
                                      ? "newest"
                                      : opt.value === "price_asc"
                                        ? "priceAsc"
                                        : opt.value === "price_desc"
                                          ? "priceDesc"
                                          : opt.value === "best_seller"
                                            ? "bestSeller"
                                            : "rating"
                            }`,
                        )}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
