import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        ab: {
          orange: "#FF5A16",
          "orange-dark": "#F46A22",
          green: "#032E26",
          "green-light": "#0C4A3B",
          "green-deep": "#041B17",
          cream: "#F4F1E9",
          black: "#0B0F0E",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      fontSize: {
        "hero-sm": ["3.25rem", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "hero-lg": ["7rem", { lineHeight: "0.9", letterSpacing: "-0.01em" }],
        mega: ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.9" }],
        giant: ["clamp(3.5rem, 11vw, 11rem)", { lineHeight: "0.82" }],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(-4%, 2%)" },
          "30%": { transform: "translate(2%, -4%)" },
          "40%": { transform: "translate(-2%, 5%)" },
          "50%": { transform: "translate(-4%, 2%)" },
          "60%": { transform: "translate(3%, 0)" },
          "70%": { transform: "translate(0, 3%)" },
          "80%": { transform: "translate(-3%, 0)" },
          "90%": { transform: "translate(2%, 2%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 30s linear infinite",
        grain: "grain 1s steps(6) infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
