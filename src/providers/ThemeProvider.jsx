import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "app-ui-theme",
    ...props
}) {
    const [theme, setThemeState] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme,
    );

    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

    const [resolvedTheme, setResolvedTheme] = useState(() =>
        theme === "system" ? getSystemTheme() : theme,
    );

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (currentTheme) => {
            root.classList.remove("light", "dark");

            const finalTheme =
                currentTheme === "system" ? getSystemTheme() : currentTheme;

            root.classList.add(finalTheme);
        };

        applyTheme(theme);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemThemeChange = () => {
            if (theme === "system") {
                const newTheme = getSystemTheme();
                setResolvedTheme(newTheme);
                applyTheme("system");
            }
        };

        // Sync resolvedTheme khi theme thay đổi
        if (theme === "system") {
            setResolvedTheme(getSystemTheme());
        } else {
            setResolvedTheme(theme);
        }

        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () =>
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }, [theme]);

    const setTheme = (newTheme) => {
        localStorage.setItem(storageKey, newTheme);
        setThemeState(newTheme);
    };

    const value = {
        theme,
        setTheme,
        resolvedTheme, // ✅ reactive
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
