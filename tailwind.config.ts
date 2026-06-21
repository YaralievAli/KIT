import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "rgb(var(--color-ink) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        graphite: "rgb(var(--color-graphite) / <alpha-value>)",
        anchor: "rgb(var(--color-anchor) / <alpha-value>)",
        "green-navy": "rgb(var(--color-deep-teal) / <alpha-value>)",
        "deep-teal": "rgb(var(--color-deep-teal) / <alpha-value>)",
        teal: "rgb(var(--color-teal) / <alpha-value>)",
        "teal-glow": "rgb(var(--color-teal-glow) / <alpha-value>)",
        champagne: "rgb(var(--color-champagne) / <alpha-value>)",
        wood: "rgb(var(--color-wood) / <alpha-value>)",
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      maxWidth: {
        site: "110rem",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 26, 43, 0.12)",
        glow: "0 0 38px rgba(20, 184, 166, 0.18)",
        card: "0 12px 34px rgba(16, 26, 43, 0.07)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        card: "1.25rem",
        panel: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
