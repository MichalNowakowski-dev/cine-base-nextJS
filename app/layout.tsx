import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Roboto, Montserrat, Oswald } from "next/font/google";
import Navigation from "./components/navigation/Navigation";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["400", "100", "300", "500", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
  display: "swap",
});
const oswald = Oswald({
  weight: ["500", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-oswald",
  display: "swap",
});
const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin", "latin-ext"],
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
