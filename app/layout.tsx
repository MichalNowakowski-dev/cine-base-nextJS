import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import Navigation from "./components/navigation/Navigation";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "react-toastify/dist/ReactToastify.css";

const roboto = localFont({
  src: [
    { path: "../public/fonts/Roboto-Thin.ttf", weight: "100" },
    { path: "../public/fonts/Roboto-Light.ttf", weight: "300" },
    { path: "../public/fonts/Roboto-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Roboto-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Roboto-Bold.ttf", weight: "700" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

const oswald = localFont({
  src: [
    { path: "../public/fonts/Oswald-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Oswald-Bold.ttf", weight: "700" },
  ],
  variable: "--font-oswald",
  display: "swap",
});

const montserrat = localFont({
  src: [{ path: "../public/fonts/Montserrat-Bold.ttf", weight: "700" }],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CineBase- Twoja baza filmów i seriali",
  description:
    "CineBase to Twoje osobiste centrum filmowe. Dodawaj do ulubionych, przeglądaj rekomendacje, oceniaj filmy i seriale. Dołącz do społeczności kinomaniaków!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${roboto.variable} ${montserrat.variable} ${oswald.variable}`}
      >
        <SessionProvider>
          <Navigation />
          <ToastContainer theme="dark" autoClose={3000} />
          {children}
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
