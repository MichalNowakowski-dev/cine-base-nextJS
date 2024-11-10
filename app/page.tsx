import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroOriginal.jpg";
import Search from "./ui/Search";
import { Suspense } from "react";
import { MediaContainerSkeleton } from "./ui/skeletons";
import MediaListContainer from "./ui/MediaListCarousel/MediaListContainer";

export default async function Home() {
  return (
    <>
      <header className="h-[50vh] w-full relative flex flex-col items-center justify-center mb-5 after:content-[''] after:absolute after:inset-0 after:bg-fade-to-dark">
        <Image
          className=" object-cover h-full absolute top-0 left-0 -z-10"
          src={HeaderImgDesktop}
          alt="Hero image"
        />
        <section className="flex flex-col gap-y-10 items-center w-full">
          <div className="text-center z-10">
            <h1>CineBase</h1>
            <p>Odkryj świat filmu w jednym miejscu!</p>
          </div>
          <Search
            className="z-10 max-w-screen-xl"
            placeholder="Wpisz szukaną frazę..."
          />
        </section>
      </header>
      <main className=" xl:max-w-screen-xl mx-auto">
        <section className="px-4 mb-8">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="top_rated"
              label="Najlepiej oceniane"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4 mb-8">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="popular"
              label="Popularne"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4 mb-8">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="trending"
              timeWindow="week"
              label="Tygodniowe trendy"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4 mb-8">
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
