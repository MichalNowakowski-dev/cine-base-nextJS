import type { Metadata } from "next";
import { Roboto, Montserrat, Oswald } from "next/font/google";
import Navigation from "./ui/Navigation/Navigation";
import "./globals.css";
import Footer from "./ui/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${roboto.variable} ${montserrat.variable} ${oswald.variable} overflow-x-hidden`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
