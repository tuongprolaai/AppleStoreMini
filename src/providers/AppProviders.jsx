import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "./ThemeProvider";
import I18nProvider from "./I18nProvider";

export default function AppProviders({ children }) {
    return (
        <ReduxProvider store={store}>
            <I18nProvider>
                <ThemeProvider
                    defaultTheme="system"
                    storageKey="apple-store-theme"
                >
                    {children}
                </ThemeProvider>
            </I18nProvider>
        </ReduxProvider>
    );
}
