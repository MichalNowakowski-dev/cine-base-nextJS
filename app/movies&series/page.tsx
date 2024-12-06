import {
  fetchTrendingList,
  fetchMoviesAndSeriesData,
} from "../lib/api/tmdbApi";
import { MediaType } from "../types/types";
import GenreCardsSectionContainer from "../components/genreCardsList/GenreCardsContainer";
import HeaderSection from "./HeaderSection";
import Tabs from "./Tabs";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import SwiperList from "../components/Swiper/SwiperList";
import { v4 as uuid } from "uuid";
import { fetchUserMediaStatus } from "../lib/api/userApi";
import { auth } from "../auth";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ mediaType: MediaType }>;
}) {
  const mediaType = (await searchParams).mediaType;
  const session = await auth();
  const trendingList = await fetchTrendingList(mediaType || "movie", "day");
  const headerList = trendingList.results.slice(0, 4);

  const {
    topRatedMovies,
    popularMovies,
    trendingMovies,
    topRatedSeries,
    popularSeries,
    trendingSeries,
  } = await fetchMoviesAndSeriesData();

  const userListsStatus = await Promise.all([
    fetchUserMediaStatus(headerList[0].id, Number(session?.user?.id), "movie"),
    fetchUserMediaStatus(headerList[1].id, Number(session?.user?.id), "movie"),
    fetchUserMediaStatus(headerList[2].id, Number(session?.user?.id), "movie"),
    fetchUserMediaStatus(headerList[3].id, Number(session?.user?.id), "movie"),
  ]);

  return (
    <PageContainer className="flex flex-col gap-5">
      <HeaderSection
        userId={Number(session?.user.id)}
        list={headerList}
        userListsStatus={userListsStatus}
      />
      <Tabs />
      <div className="relative  mb-16">
        <span className="hidden lg:inline px-5 py-2 bg-primary rounded-lg absolute top-0 left-20 -translate-x-1/2 -translate-y-1/2">
          Filmy
        </span>
        <section className="lg:p-5 lg:border border-borderPrimary rounded-lg flex flex-col gap-5 lg:gap-20">
          <GenreCardsSectionContainer
            swiperId={uuid()}
            mediaType={mediaType || "movie"}
          >
            <h3 className="text-h3 ">Nasze gatunki</h3>
          </GenreCardsSectionContainer>
          <section>
            <SwiperList
              swiperId={uuid()}
              mediaList={topRatedMovies.results}
              mediaType={mediaType || "movie"}
              listLabel="Najlepiej oceniane"
            ></SwiperList>
          </section>
          <section>
            <SwiperList
              swiperId={uuid()}
              mediaType={mediaType || "movie"}
              listLabel="Popularne"
              mediaList={popularMovies.results}
            ></SwiperList>
          </section>
          <section>
            <SwiperList
              swiperId={uuid()}
              mediaType={mediaType || "movie"}
              listLabel="Tygodniowe trendy"
              mediaList={trendingMovies.results}
            ></SwiperList>
          </section>
        </section>
      </div>
      <div className="hidden lg:block relative ">
        <span className="px-5 py-2 bg-primary rounded-lg absolute top-0 left-20 -translate-x-1/2 -translate-y-1/2">
          Seriale
        </span>
        <section className="p-5 border border-borderPrimary rounded-lg flex flex-col gap-20">
          <GenreCardsSectionContainer mediaType={"tv"} swiperId={uuid()}>
            <h3 className="text-h3 ">Nasze gatunki</h3>
          </GenreCardsSectionContainer>
          <section>
            <SwiperList
              swiperId={uuid()}
              mediaList={topRatedSeries.results}
              mediaType={mediaType || "tv"}
              listLabel="Najlepiej oceniane"
            ></SwiperList>
          </section>
          <section>
            <SwiperList
              swiperId={uuid()}
              mediaType={mediaType || "tv"}
              listLabel="Popularne"
              mediaList={popularSeries.results}
            ></SwiperList>
          </section>
          <section>
            <SwiperList
              swiperId={uuid()}
              mediaType={mediaType || "tv"}
              listLabel="Tygodniowe trendy"
              mediaList={trendingSeries.results}
            ></SwiperList>
          </section>
        </section>
      </div>
    </PageContainer>
  );
}
