import React from "react";
import ReactDOM from "react-dom/client";
import AppProviders from "./providers/AppProviders";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProviders>
            <App />
            <Toaster />
        </AppProviders>
    </React.StrictMode>,
);
