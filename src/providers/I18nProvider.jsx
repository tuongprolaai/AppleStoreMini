import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function I18nProvider({ children }) {
    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </I18nextProvider>
    );
}
