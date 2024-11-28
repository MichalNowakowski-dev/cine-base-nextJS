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
      height: {
        "screen-minus-nav": `calc(100vh - 80px)`,
      },
      backgroundImage: {
        "fade-black-to-red": `linear-gradient(270deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), 
                           radial-gradient(circle at top right, rgba(255, 0, 0, 0.3), transparent),
                           linear-gradient(to bottom, #111, #222)`,
        "fade-top-black-bottom-red": `linear-gradient(to bottom, rgba(15, 15, 15, 0.8) 0%, rgba(20, 15, 15, 0.5) 48%, rgba(20, 15, 15, 0.5) 97%),
                                  linear-gradient(to bottom, rgba(20, 15, 15, 0.8) 0%, rgba(34, 14, 14, 0.5) 66%, rgba(34, 14, 14, 0.5) 91%),
                                  linear-gradient(to bottom, rgba(34, 14, 14, 0.8) 0%, rgba(229, 0, 0, 0.5) 100%)`,
        "fade-black-to-red-cta": `linear-gradient(to right, rgba(15, 15, 15, 0.9) 0%, rgba(20, 15, 15, 0.5) 48%, rgba(20, 15, 15, 0.5) 97%),
                                  linear-gradient(to right, rgba(20, 15, 15, 0.9) 0%, rgba(34, 14, 14, 0.5) 66%, rgba(34, 14, 14, 0.5) 91%),
                                  linear-gradient(to right, rgba(34, 14, 14, 0.9) 0%, rgba(229, 0, 0, 0.5) 100%)`,
        "fade-red-to-black":
          "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(229,0,0,0.7) 100%)",
        "fade-to-dark":
          "linear-gradient(to bottom, rgba(20, 20, 20, 0)50%,  #141414)",
        "fadeout-bottom":
          "linear-gradient(to bottom, rgba(26, 26, 26, 0) 0%, #1A1A1A 100%)",
        notFoundBg: "url('/notFoundBg.png')",
        mediaPlayBg: "url('/mediaPlayBg.jpg')",
      },
      colors: {
        background: "var(--background)",
        backgroundLight: "var(--background-light)",
        backgroundFooter: "var(--background-footer)",
        foreground: "var(--foreground)",
        primary: "#E50000",
        secondary: "#999999",
        borderPrimary: "#262626",
      },
      fontSize: {
        h1: "2.25rem", // 36px
        h2: "1.7rem", // 30px
        h3: "1.5rem", // 24px
        h4: "1.25rem", // 20px
        h5: "1.125rem", // 18px
        h6: "1rem", // 16px
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% + 100px))" }, // Dostosuj szerokość `100px` do swoich potrzeb
        },
      },
      animation: {
        scroll: "scroll 5s linear infinite",
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
