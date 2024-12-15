import {
  fetchMediaByID,
  fetchSeriesByTitlefromOMDB,
  fetchMediaData,
} from "@/app/lib/api/tmdbApi";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { fetchAllSeasonsData } from "@/app/lib/utils";
import SeasonItem from "@/app/tv/[id]/SeasonItem";
import FreeTrialCta from "@/app/components/ui/freeTrialCta/FreeTrialCta";
import { LogoSize } from "@/app/types/types";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import SwiperPeople from "@/app/components/Swiper/SwiperPeople";
import SwiperVideo from "@/app/components/Swiper/SwiperVideo";
import SwiperList from "@/app/components/Swiper/SwiperList";
import BackdropList from "@/app/components/backdropsList/BackdropList";
import MediaDetailsSection from "@/app/components/mediaDetailsSection/MediaDetailsSection";
import MediaDetailsHeaderSection from "@/app/components/mediaDetailsHeaderSection/MediaDetailsHeaderSection";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const seriesDetails = await fetchMediaByID(id, "tv");
  const seriesDetailsFromOmdb = await fetchSeriesByTitlefromOMDB(
    seriesDetails?.original_name
  );
  const numberOfSeasons = seriesDetails.number_of_seasons;
  const seasonsData = await fetchAllSeasonsData(Number(id), numberOfSeasons);

  const {
    providers,
    mediaMembers,
    mediaRecommendationsList,
    videoList,
    imagesList,
  } = await fetchMediaData(id, "tv");

  return (
    <PageContainer>
      <MediaDetailsHeaderSection mediaDetails={seriesDetails} mediaType="tv" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 bg-backgroundLight rounded-md md:col-span-2 border border-borderPrimary">
          <h2 className="text-lg mb-5 text-secondary">Sezony i odcinki</h2>
          {seriesDetails.seasons.length > 0 ? (
            <ul className="flex flex-wrap gap-5">
              {seriesDetails.seasons?.map(
                (
                  season: { id: number; name: string; episode_count: number },
                  i: number
                ) => {
                  if (season.name === "Odcinki specjalne") return;
                  return (
                    <SeasonItem
                      key={season.id}
                      episodeCount={season.episode_count}
                      seasonData={seasonsData[i - 1]}
                    />
                  );
                }
              )}
            </ul>
          ) : (
            <p>Wkrótce na platformie...</p>
          )}
        </div>
        <MediaDetailsSection
          className="p-7 bg-backgroundLight rounded-md "
          mediaDetails={seriesDetails}
          mediaDetailsFromOmdb={seriesDetailsFromOmdb}
          mediaCrew={mediaMembers.crew}
          mediaType="tv"
        />
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-full lg:col-span-2 border border-borderPrimary">
          <h3 className="text-secondary mb-3">Opis</h3>
          <p className="text-white">
            {seriesDetails.overview ? seriesDetails.overview : "Brak opisu"}
          </p>
        </div>
        {providers.results?.PL?.flatrate && (
          <div className="p-7 bg-backgroundLight rounded-md col-span-full  lg:col-start-3 border border-borderPrimary">
            {providers?.results?.PL?.flatrate?.length > 0 ? (
              <div>
                <h3 className="text-secondary mb-3">
                  Gdzie jeszcze można zobaczyć:
                </h3>
                <ul className="flex gap-3">
                  {providers?.results?.PL?.flatrate?.map(
                    (item: { provider_id: number; logo_path: string }) => (
                      <li key={item.provider_id}>
                        <Image
                          className="rounded-md w-10 h-10 md:w-16  md:h-16"
                          height={154}
                          width={154}
                          alt="provider logo"
                          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${LogoSize.LARGE}${item.logo_path}`}
                        />
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-xl text-secondary">
                Ten film nie jest obecnie dostępny na innych platformach VOD.
              </p>
            )}
          </div>
        )}

        <div className="p-7 bg-backgroundLight rounded-md md:col-span-full lg:col-span-2 border border-borderPrimary flex flex-col gap-4 justify-between">
          {mediaMembers.cast.length > 0 && (
            <section className=" basis-1/3">
              <SwiperPeople
                listLabel="Obsada"
                personList={mediaMembers.cast}
                swiperId={uuid()}
                labelClassName="text-lg text-secondary"
              />
            </section>
          )}
          {mediaRecommendationsList.results.length > 0 && (
            <section className=" basis-1/3">
              <SwiperList
                mediaType="movie"
                mediaList={mediaRecommendationsList.results}
                listLabel="Rekomendacje"
                swiperId={uuid()}
                labelClassName="text-lg text-secondary"
              />
            </section>
          )}
          {videoList.results.length > 0 && (
            <section className=" basis-1/3">
              <SwiperVideo
                listLabel="Zwiastuny i ciekawostki"
                videoList={videoList.results}
                swiperId={uuid()}
                labelClassName="text-lg text-secondary"
              />
            </section>
          )}
        </div>
        <div className="p-7 bg-backgroundLight rounded-md col-span-full lg:col-start-3 border border-borderPrimary">
          <h3 className="text-secondary mb-4">Tła</h3>
          {imagesList.backdrops.length > 0 ? (
            <BackdropList list={imagesList.backdrops} />
          ) : (
            <p>Brak teł</p>
          )}
        </div>
      </section>
      <section className="my-20">
        <FreeTrialCta />
      </section>
    </PageContainer>
  );
}
