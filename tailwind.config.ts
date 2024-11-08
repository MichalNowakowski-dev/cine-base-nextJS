import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "fade-red-to-black":
          "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(229,0,0,0.7) 100%)",
        "fade-to-dark":
          "linear-gradient(to bottom, rgba(20, 20, 20, 0), #141414)",
      },
      colors: {
        background: "var(--background)",
        backgroundLight: "var(--background-light)",
        backgroundFooter: "var(--background-footer)",
        foreground: "var(--foreground)",
        primary: "#E50000",
        secondary: "#999999",
      },
      fontSize: {
        h1: "2.25rem", // 36px
        h2: "1.875rem", // 30px
        h3: "1.5rem", // 24px
        h4: "1.25rem", // 20px
        h5: "1.125rem", // 18px
        h6: "1rem", // 16px
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".no-scrollbar": {
          "scrollbar-width": "none" /* Firefox */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, Edge */,
        },
      });
    }),
  ],
};
export default config;
