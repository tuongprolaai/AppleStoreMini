export const LANGUAGES = {
    VI: "vi",
    EN: "en",
};

export const DEFAULT_LANGUAGE = LANGUAGES.VI;

export const LANGUAGE_OPTIONS = [
    { value: LANGUAGES.VI, label: "Tiếng Việt", short: "VN", flag: "🇻🇳" },
    { value: LANGUAGES.EN, label: "English", short: "EN", flag: "🇺🇸" },
];

export const LANGUAGE_STORAGE_KEY = "apple-store-language";
