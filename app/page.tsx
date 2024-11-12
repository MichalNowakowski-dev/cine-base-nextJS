import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroOriginal.jpg";
import { Suspense } from "react";
import { MediaContainerSkeleton } from "./ui/skeletons";
import MediaListContainer from "./ui/MediaListCarousel/MediaListContainer";
import CtaButton from "./ui/CtaButton";
import Link from "next/link";
import GenresCardsSectionContainer from "./ui/GenresCards/GenresCardsContainer";
import DeviceCardsList from "./ui/DeviceCards/DeviceCardsList";

export default async function Home() {
  return (
    <>
      <header className="h-[70vh] w-full relative flex flex-col items-center justify-center mb-5 after:content-[''] after:absolute after:inset-0 after:bg-fade-to-dark">
        <Image
          className=" object-cover h-full absolute top-0 left-0 -z-10"
          src={HeaderImgDesktop}
          alt="Hero image"
        />
        <section className="flex items-end h-full pb-20">
          <div className="text-center z-10 flex flex-col justify-center items-center gap-4">
            <h1>CineBase</h1>
            <p className="text-sm text-secondary w-2/3">
              CineBase to najlepsze doświadczenie streamingowe do oglądania
              ulubionych filmów i programów na żądanie, w dowolnym czasie i
              miejscu. Dzięki CineBase możesz cieszyć się szeroką gamą treści, w
              tym najnowszymi hitami, klasycznymi filmami, popularnymi serialami
              i nie tylko. Możesz również tworzyć własne listy obserwowanych,
              dzięki czemu łatwo znajdziesz treści, które chcesz obejrzeć.
            </p>
            <Link href={"/sign-in"}>
              <CtaButton>Zacznij oglądać</CtaButton>
            </Link>
          </div>
        </section>
      </header>
      <main className=" xl:max-w-screen-xl mx-auto flex flex-col gap-16">
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
        </section>
      </main>
    </>
  );
}
