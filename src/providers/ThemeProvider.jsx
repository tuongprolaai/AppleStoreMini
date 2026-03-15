import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "app-ui-theme",
    ...props
}) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme,
    );

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (currentTheme) => {
            root.classList.remove("light", "dark");

            if (currentTheme === "system") {
                const systemTheme = window.matchMedia(
                    "(prefers-color-scheme: dark)",
                ).matches
                    ? "dark"
                    : "light";
                root.classList.add(systemTheme);
                return;
            }

            root.classList.add(currentTheme);
        };

        applyTheme(theme);

        // Lắng nghe khi user đổi theme hệ thống — chỉ áp dụng khi đang ở chế độ system
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => {
            if (theme === "system") applyTheme("system");
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () =>
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
        // Trả về theme thực tế đang áp dụng — light hoặc dark, không phải system
        resolvedTheme:
            theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : theme,
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
