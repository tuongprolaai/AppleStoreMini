import { useTranslation } from "react-i18next";
import { STORAGE_KEYS } from "@/lib/constants";

export function useLanguage() {
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language?.startsWith("vi") ? "vi" : "en";

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    };

    const toggleLanguage = () => {
        changeLanguage(currentLanguage === "vi" ? "en" : "vi");
    };

    return {
        currentLanguage,
        isVietnamese: currentLanguage === "vi",
        changeLanguage,
        toggleLanguage,
    };
}
