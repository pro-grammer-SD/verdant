export const designConfig = {
    colors: {
        primary: "#11d411",
        primaryDark: "#081a08",
        primaryLight: "#4ade80",
        accent: "#11d411",
        surface: {
            50: "#f6f8f6",
            100: "#EEEEE4",
            200: "rgba(17, 212, 17, 0.1)",
            800: "#1c1917", // Terra Umber
            900: "#0c0a09", // Cacao Noir (Premium Brown)
        }
    },
    // Unified Spacing System: OP Tier
    spacing: {
        base: "32px",
        safe: "px-8 md:px-12 lg:px-16", // Tighter, more modern desktop margins
        section: "py-32 md:py-48", // Single, intentional scale
        gap: "gap-8"
    },
    glass: {
        base: "bg-[#1c1917]/40 backdrop-blur-2xl border border-white/5",
        hover: "hover:border-[var(--color-primary)]/40 hover:bg-[#1c1917]/60",
    }
};
