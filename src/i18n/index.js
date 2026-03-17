import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { STORAGE_KEYS } from "@/lib/constants";

// Tiếng Việt
import viCommon from "./locales/vi/common.json";
import viAuth from "./locales/vi/auth.json";
import viProduct from "./locales/vi/product.json";
import viCart from "./locales/vi/cart.json";
import viCheckout from "./locales/vi/checkout.json";
import viOrder from "./locales/vi/order.json";
import viProfile from "./locales/vi/profile.json";
import viAdmin from "./locales/vi/admin.json";
import viValidation from "./locales/vi/validation.json";

// Tiếng Anh
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enProduct from "./locales/en/product.json";
import enCart from "./locales/en/cart.json";
import enCheckout from "./locales/en/checkout.json";
import enOrder from "./locales/en/order.json";
import enProfile from "./locales/en/profile.json";
import enAdmin from "./locales/en/admin.json";
import enValidation from "./locales/en/validation.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            vi: {
                common: viCommon,
                auth: viAuth,
                product: viProduct,
                cart: viCart,
                checkout: viCheckout,
                order: viOrder,
                profile: viProfile,
                admin: viAdmin,
                validation: viValidation,
            },
            en: {
                common: enCommon,
                auth: enAuth,
                product: enProduct,
                cart: enCart,
                checkout: enCheckout,
                order: enOrder,
                profile: enProfile,
                admin: enAdmin,
                validation: enValidation,
            },
        },

        fallbackLng: "vi",

        ns: [
            "common",
            "auth",
            "product",
            "cart",
            "checkout",
            "order",
            "profile",
            "admin",
            "validation",
        ],
        defaultNS: "common",

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: STORAGE_KEYS.LANGUAGE,
            caches: ["localStorage"],
        },
    });

export default i18n;
