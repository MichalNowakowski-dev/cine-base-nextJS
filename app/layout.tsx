import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import Navigation from "./ui/Navigation";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "100", "500", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
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
        className={`${roboto.variable} ${montserrat.variable} antialiased xl:max-w-screen-xl mx-auto`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
