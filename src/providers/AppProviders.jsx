import { ThemeProvider } from "./ThemeProvider";
import I18nProvider from "./I18nProvider";

export default function AppProviders({ children }) {
    return (
        <I18nProvider>
            <ThemeProvider defaultTheme="system" storageKey="apple-store-theme">
                {children}
            </ThemeProvider>
        </I18nProvider>
    );
}
