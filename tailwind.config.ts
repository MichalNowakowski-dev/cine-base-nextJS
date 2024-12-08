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
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        "star-gradient": "linear-gradient(180deg, #0d1117, #000000)",
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
        "fade-to-transparent":
          "linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)",
        "fadeout-bottom":
          "linear-gradient(to bottom, rgba(26, 26, 26, 0) 0%, #1A1A1A 100%)",
        notFoundBg: "url('/notFoundBg.png')",
        mediaPlayBg: "url('/mediaPlayBg.jpg')",
        signupBg: "url('/signUpBackground.jpg')",
      },
      colors: {
        background: "var(--background)",
        backgroundLight: "var(--background-light)",
        backgroundFooter: "var(--background-footer)",
        backgroundDashboardCard: "var(--background-dashboard-card)",
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
        twinkle: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        fallingStar: {
          "0%": {
            transform: "translateX(0) translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(50px) translateY(100vh)",
            opacity: "0",
          },
        },
      },
      animation: {
        scroll: "scroll 5s linear infinite",
        twinkle: "twinkle 3s infinite alternate",
        fallingStar: "fallingStar 5s linear infinite",
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
