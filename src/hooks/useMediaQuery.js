import { useState, useEffect } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches,
    );

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = (e) => setMatches(e.matches);

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

// Preset hooks tiện dùng
export function useIsMobile() {
    return useMediaQuery("(max-width: 767px)");
}
export function useIsTablet() {
    return useMediaQuery("(max-width: 1023px)");
}
export function useIsDesktop() {
    return useMediaQuery("(min-width: 1024px)");
}
