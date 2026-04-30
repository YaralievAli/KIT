import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#101A2B",
        graphite: "#151A1E",
        "green-navy": "#062E30",
        teal: "#0D9488",
        "teal-glow": "#14B8A6",
        champagne: "#C8A96E",
        wood: "#8B5E3C",
        surface: "#F8FAFC",
        border: "#E2E8F0",
        muted: "#64748B",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 26, 43, 0.12)",
        glow: "0 0 38px rgba(20, 184, 166, 0.18)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
