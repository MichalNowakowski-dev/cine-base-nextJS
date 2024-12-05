import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroImageCineBase.png";
import DeviceCardsList from "./components/deviceList/DeviceCardsList";
import FaqList from "./components/faqList/FaqList";
import FreeTrialCta from "./components/ui/freeTrialCta/FreeTrialCta";
import SubscriptionPlan from "./plans/SubscriptionPlan/SubscriptionPlan";
import CtaLink from "./components/ui/ctaLink/CtaLink";
import { prisma } from "./prisma";
import GenreCardsContainer from "./components/genreCardsList/GenreCardsContainer";

export default async function Home() {
  const plans = await prisma.plan.findMany();
  return (
    <>
      <header className="h-[70vh] w-full relative flex flex-col items-center justify-center mb-5 after:content-[''] after:absolute after:inset-0 after:bg-fade-to-dark">
        <Image
          className=" object-cover w-full h-full absolute top-0 left-0 -z-10"
          src={HeaderImgDesktop}
          alt="Hero image"
          priority
        />
        <section className="flex items-center h-full ">
          <div className="text-center z-10 flex flex-col justify-center items-center gap-4">
            <h1
              className="text-5xl uppercase tracking-wider text-center 
           [text-shadow:0_0_10px_rgba(102,204,255,0.8),0_0_20px_rgba(102,204,255,0.6),0_0_30px_rgba(102,204,255,0.4)]"
            >
              CineBase
            </h1>
            <p
              className="text-lg bg-gradient-to-r from-blue-300 via-pink-300 to-purple-400 
           text-transparent bg-clip-text w-2/3  mb-5"
            >
              CineBase to najlepsze doświadczenie streamingowe do oglądania
              ulubionych filmów i programów na żądanie, w dowolnym czasie i
              miejscu
            </p>

            <CtaLink href={"/movies&series"}>Zacznij oglądać</CtaLink>
          </div>
        </section>
      </header>
      <main className=" xl:max-w-screen-xl mx-auto flex flex-col gap-16 ">
        <section className="px-4">
          <GenreCardsContainer mediaType="movie">
            <header>
              <h2 className="text-2xl mb-2">
                Eksploruj nasz szeroki wybór kategorii
              </h2>
              <p className="text-sm text-secondary md:w-2/3">
                Niezależnie od tego, czy szukasz komedii, która Cię rozśmieszy,
                dramatu, który zmusi Cię do myślenia, czy dokumentu, który
                pozwoli Ci dowiedzieć się czegoś nowego
              </p>
            </header>
          </GenreCardsContainer>
        </section>

        <section className="px-4">
          <header className="mb-6">
            <h2 className="mb-4 text-2xl">
              Zapewniamy możliwość przesyłania strumieniowego na różnych
              urządzeniach
            </h2>
            <p className="text-secondary text-sm">
              Dzięki CineBase możesz oglądać swoje ulubione filmy i programy
              telewizyjne zawsze i wszędzie.{" "}
              <span className=" hidden md:inline">
                Nasza platforma jest zaprojektowana tak, aby była kompatybilna z
                szeroką gamą urządzeń, zapewniając, że nigdy nie przegapisz
                chwili rozrywki.
              </span>
            </p>
          </header>
          <DeviceCardsList />
        </section>

        <section className="px-4">
          <div className="flex flex-wrap gap-3 justify-between items-center mb-8">
            <header>
              <h2 className="mb-3 text-h2 ">Często zadawane pytania</h2>
              <p className="text-sm text-secondary">
                Masz pytania? Mamy odpowiedzi! Sprawdź naszą sekcję FAQ, aby
                znaleźć odpowiedzi na najczęstsze pytania dotyczące CineBase.
              </p>
            </header>
            <CtaLink href="/support">Zadaj pytanie</CtaLink>
          </div>
          <FaqList />
        </section>

        <section className="px-4">
          <SubscriptionPlan plansData={plans} />
        </section>

        <section className="px-4 mb-16">
          <FreeTrialCta />
        </section>
      </main>
    </>
  );
}
