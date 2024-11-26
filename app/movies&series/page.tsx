import { Suspense } from "react";
import { fetchTrendingList } from "../lib/data";
import { MediaType } from "../lib/types";
import GenreCardsSectionContainer from "../components/genreCardsList/GenreCardsContainer";
import HeaderSection from "./HeaderSection";
import Tabs from "./Tabs";
import { MediaContainerSkeleton } from "../components/ui/skeletons/skeletons";
import MediaListContainer from "../components/mediaListCarousel/MediaListContainer";
import PageContainer from "../components/ui/pageContainer/PageContainer";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ mediaType: MediaType }>;
}) {
  const mediaType = (await searchParams).mediaType;

  const trendingList = await fetchTrendingList(mediaType || "movie", "day");
  const headerList = trendingList.results.slice(0, 4);

  return (
    <PageContainer className="flex flex-col gap-5">
      <HeaderSection list={headerList} />
      <Tabs />
      <div className="relative  mb-16">
        <span className="hidden lg:inline px-5 py-2 bg-primary rounded-lg absolute top-0 left-20 -translate-x-1/2 -translate-y-1/2">
          Filmy
        </span>
        <section className="lg:p-5 lg:border border-borderPrimary rounded-lg flex flex-col gap-5 lg:gap-20">
          <GenreCardsSectionContainer mediaType={mediaType || "movie"}>
            <h3 className="text-h3 ">Nasze gatunki</h3>
          </GenreCardsSectionContainer>
          <section>
            <Suspense fallback={<MediaContainerSkeleton />}>
              <MediaListContainer
                mediaCategory="top_rated"
                mediaType={mediaType || "movie"}
              >
                <h3 className="text-h3">Najlepiej oceniane</h3>
              </MediaListContainer>
            </Suspense>
          </section>
          <section>
            <Suspense fallback={<MediaContainerSkeleton />}>
              <MediaListContainer
                mediaCategory="popular"
                mediaType={mediaType || "movie"}
              >
                <h3 className="text-h3">Popularne</h3>
              </MediaListContainer>
            </Suspense>
          </section>
          <section>
            <Suspense fallback={<MediaContainerSkeleton />}>
              <MediaListContainer
                mediaCategory="trending"
                timeWindow="week"
                mediaType={mediaType || "movie"}
              >
                <h3 className="text-h3">Tygodniowe trendy</h3>
              </MediaListContainer>
            </Suspense>
          </section>
        </section>
      </div>
      <div className="hidden lg:block relative ">
        <span className="px-5 py-2 bg-primary rounded-lg absolute top-0 left-20 -translate-x-1/2 -translate-y-1/2">
          Seriale
        </span>
        <section className="p-5 border border-borderPrimary rounded-lg flex flex-col gap-20">
          <GenreCardsSectionContainer mediaType={"tv"}>
            <h3 className="text-h3 ">Nasze gatunki</h3>
          </GenreCardsSectionContainer>
          <section>
            <Suspense fallback={<MediaContainerSkeleton />}>
              <MediaListContainer mediaCategory="top_rated" mediaType={"tv"}>
                <h3 className="text-h3">Najlepiej oceniane</h3>
              </MediaListContainer>
            </Suspense>
          </section>
          <section>
            <Suspense fallback={<MediaContainerSkeleton />}>
              <MediaListContainer mediaCategory="popular" mediaType={"tv"}>
                <h3 className="text-h3">Popularne</h3>
              </MediaListContainer>
            </Suspense>
          </section>
          <section>
            <Suspense fallback={<MediaContainerSkeleton />}>
              <MediaListContainer
                mediaCategory="trending"
                timeWindow="week"
                mediaType={"tv"}
              >
                <h3 className="text-h3">Tygodniowe trendy</h3>
              </MediaListContainer>
            </Suspense>
          </section>
        </section>
      </div>
    </PageContainer>
  );
}
