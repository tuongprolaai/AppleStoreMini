/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        "translate-x-0",
        "-translate-x-full",
        "opacity-0",
        "opacity-100",
        "scale-95",
        "scale-100",
    ],
    plugins: [typography],
};
