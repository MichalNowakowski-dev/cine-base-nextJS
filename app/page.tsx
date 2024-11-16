import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroImageCineBase.png";
import GenresCardsSectionContainer from "./ui/GenresCards/GenresCardsContainer";
import DeviceCardsList from "./ui/DeviceCards/DeviceCardsList";
import AccordionsList from "./ui/Accordions/AccordionsList";
import FreeTrialCta from "./ui/FreeTrialCta";
import SubscriptionPlan from "./ui/SubscriptionPlan/SubscriptionPlan";
import CtaLink from "./ui/CtaLink";

export default async function Home() {
  return (
    <>
      <header className="h-[70vh] w-full relative flex flex-col items-center justify-center mb-5 after:content-[''] after:absolute after:inset-0 after:bg-fade-to-dark">
        <Image
          className=" object-cover h-full absolute top-0 left-0 -z-10"
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

            <CtaLink href={"/sign-in"}>Zacznij oglądać</CtaLink>
          </div>
        </section>
      </header>
      <main className=" xl:max-w-screen-xl mx-auto flex flex-col gap-16 ">
        <section className="flex flex-wrap gap-6 px-4">
          <GenresCardsSectionContainer />
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
          <AccordionsList />
        </section>

        <section className="px-4">
          <SubscriptionPlan />
        </section>

        <section className="px-4 mb-16">
          <FreeTrialCta />
        </section>

        {/* <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="top_rated"
              label="Najlepiej oceniane"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="popular"
              label="Popularne"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="trending"
              timeWindow="week"
              label="Tygodniowe trendy"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              movieCategories={["now_playing", "upcoming"]}
              label="W kinach"
              switchNames={["Teraz", "Wkrótce"]}
            />
          </Suspense>
        </section> */}
      </main>
    </>
  );
}
