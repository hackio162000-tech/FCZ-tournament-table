import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberpunk: {
          bg: "#0a0e27",
          card: "#1a1f3a",
          accent: "#00ff88",
          accentDim: "#00cc66",
          primary: "#ff006e",
          secondary: "#00b4ff",
          tertiary: "#ffd60a",
          dark: "#16213e",
        },
      },
      boxShadow: {
        neon: "0 0 10px rgba(0, 255, 136, 0.5)",
        neonPrimary: "0 0 20px rgba(255, 0, 110, 0.5)",
        neonSecondary: "0 0 20px rgba(0, 180, 255, 0.5)",
      },
      textShadow: {
        neon: "0 0 10px rgba(0, 255, 136, 0.8)",
        neonPrimary: "0 0 10px rgba(255, 0, 110, 0.8)",
      },
      borderColor: {
        neon: "rgba(0, 255, 136, 0.5)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flicker: "flicker 0.15s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            textShadow:
              "0 0 10px rgba(0, 255, 136, 0.8), 0 0 20px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.4)",
          },
          "20%, 24%, 55%": {
            textShadow: "none",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
