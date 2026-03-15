import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import AppProviders from "./providers/AppProviders";
import { persistor } from "./store";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.jsx";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProviders>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                <Toaster />
            </PersistGate>
        </AppProviders>
    </React.StrictMode>,
);
