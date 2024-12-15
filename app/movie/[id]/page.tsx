import {
  fetchMediaByID,
  fetchMovieByIDfromOMDB,
  fetchMediaData,
} from "@/app/lib/api/tmdbApi";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import FreeTrialCta from "@/app/components/ui/freeTrialCta/FreeTrialCta";
import { LogoSize, MediaItem } from "@/app/types/types";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import SwiperList from "@/app/components/Swiper/SwiperList";
import SwiperPeople from "@/app/components/Swiper/SwiperPeople";
import SwiperVideo from "@/app/components/Swiper/SwiperVideo";
import BackdropList from "@/app/components/backdropsList/BackdropList";
import MediaDetailsSection from "@/app/components/mediaDetailsSection/MediaDetailsSection";
import MediaDetailsHeaderSection from "@/app/components/mediaDetailsHeaderSection/MediaDetailsHeaderSection";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieDetails: MediaItem = await fetchMediaByID(id, "movie");
  const movieDetailsFromOmdb = await fetchMovieByIDfromOMDB(
    movieDetails.imdb_id as string
  );

  const {
    providers,
    mediaMembers,
    mediaRecommendationsList,
    videoList,
    imagesList,
  } = await fetchMediaData(id, "movie");

  return (
    <PageContainer>
      <MediaDetailsHeaderSection
        mediaDetails={movieDetails}
        mediaType="movie"
      />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-2">
          <h3 className="text-secondary mb-3">Opis</h3>
          <p className="text-white">
            {movieDetails.overview ? movieDetails.overview : "Brak opisu"}
          </p>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md md:col-start-3">
          {providers.results?.PL?.flatrate || providers.results?.PL?.rent ? (
            <>
              <div className="mb-7">
                <h3 className="text-secondary mb-3">
                  Gdzie jeszcze można zobaczyć:
                </h3>
                <ul className="flex gap-3">
                  {providers.results?.PL?.flatrate &&
                    providers.results.PL.flatrate.map(
                      (item: { provider_id: number; logo_path: string }) => (
                        <li key={item.provider_id}>
                          <Image
                            className="rounded-md"
                            height={40}
                            width={40}
                            alt="provider logo"
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${LogoSize.SMALL}${item.logo_path}`}
                          />
                        </li>
                      )
                    )}
                  {}
                </ul>
              </div>
              <div>
                <h3 className="text-secondary mb-3">Gdzie można wypożyczyć:</h3>
                <ul className="flex gap-3">
                  {providers.results?.PL?.rent &&
                    providers.results.PL.rent.map(
                      (item: { logo_path: string; provider_id: number }) => (
                        <li key={item.provider_id}>
                          <Image
                            className="rounded-md"
                            height={40}
                            width={40}
                            alt="provider logo"
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${LogoSize.SMALL}${item.logo_path}`}
                          />
                        </li>
                      )
                    )}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-xl text-secondary">
              Ten film nie jest obecnie dostępny na innych platformach VOD.
            </p>
          )}
        </div>
        <MediaDetailsSection
          className="p-7 bg-backgroundLight rounded-md "
          mediaDetails={movieDetails}
          mediaDetailsFromOmdb={movieDetailsFromOmdb}
          mediaCrew={mediaMembers.crew}
          mediaType="movie"
        />
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-2 flex flex-col gap-4 justify-between">
          {mediaMembers.cast.length > 0 && (
            <section>
              <SwiperPeople
                listLabel="Obsada"
                personList={mediaMembers.cast}
                swiperId={uuid()}
                labelClassName="text-lg text-secondary"
              />
            </section>
          )}
          {mediaRecommendationsList.results.length > 0 && (
            <section>
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
            <section>
              <SwiperVideo
                listLabel="Zwiastuny i ciekawostki"
                videoList={videoList.results}
                swiperId={uuid()}
                labelClassName="text-lg text-secondary"
              />
            </section>
          )}
        </div>
        <div className="p-7 bg-backgroundLight rounded-md lg:col-span-full border border-borderPrimary">
          <h3 className="text-secondary mb-4">Tła</h3>
          {imagesList.backdrops.length > 0 ? (
            <BackdropList
              list={imagesList.backdrops}
              className=" lg:!grid-cols-6"
            />
          ) : (
            <p>Brak teł</p>
          )}
        </div>
      </section>
      <section className="mb-20">
        <FreeTrialCta />
      </section>
    </PageContainer>
  );
}
