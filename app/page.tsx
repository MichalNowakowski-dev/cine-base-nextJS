import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroOriginal.jpg";
import Search from "./ui/Search";
import { Suspense } from "react";
import { MediaContainerSkeleton } from "./ui/skeletons";
import MediaListContainer from "./ui/MediaListCarousel/MediaListContainer";
import { fetchGenresList, fetchMovieListByGenre } from "./lib/data";
import CtaButton from "./ui/CtaButton";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import noPoster from "@/public/no-poster-img.webp";
import GenresCards from "./ui/GenresCards/GenresCards";
import GenresCardsSection from "./ui/GenresCards/GenresCardsSection";
import GenresCardsSectionContainer from "./ui/GenresCards/GenresCardsContainer";

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
      <main className=" xl:max-w-screen-xl mx-auto">
        <section className="flex flex-wrap gap-6 px-4 mb-8">
          <GenresCardsSectionContainer />
        </section>

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
