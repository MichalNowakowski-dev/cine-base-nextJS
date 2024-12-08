import {
  fetchMediaByID,
  fetchSeriesByTitlefromOMDB,
  fetchMediaData,
} from "@/app/lib/api/tmdbApi";

import NoProfilePicture from "@/public/no-profile-img.png";

import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { PiTranslate } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaRegStar, FaScroll } from "react-icons/fa";
import {
  fetchAllSeasonsData,
  getPersonImagePathFromList,
} from "@/app/lib/utils";
import CtaLink from "@/app/components/ui/ctaLink/CtaLink";
import SeasonItem from "@/app/tv/[id]/SeasonItem";
import ImageModal from "@/app/components/imageModal/ImageModal";
import FreeTrialCta from "@/app/components/ui/freeTrialCta/FreeTrialCta";
import { BackdropSize, LogoSize, ProfileSize } from "@/app/types/types";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import RateMediaButton from "@/app/components/ui/rateMediaBtn/RateMediaBtn";
import AddToWatchlistButton from "@/app/components/ui/addToWatchBtn/AddToWatchlistButton";
import FavoriteButton from "@/app/components/ui/addToFavBtn/AddToFavoriteBtn";
import { fetchUserMediaStatus } from "@/app/lib/api/userApi";
import { auth } from "@/app/auth";
import { styles } from "@/app/styles";
import SwiperPeople from "@/app/components/Swiper/SwiperPeople";
import SwiperVideo from "@/app/components/Swiper/SwiperVideo";
import SwiperList from "@/app/components/Swiper/SwiperList";
import { v4 as uuid } from "uuid";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

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

  const { favoriteStatus, watchlistStatus, ratingStatus } =
    await fetchUserMediaStatus(
      seriesDetails.id,
      Number(session?.user?.id),
      "tv"
    );

  return (
    <PageContainer>
      <section className={styles.headerSection}>
        <Image
          className="absolute object-cover top-0 left-0 rounded-md -z-10 h-full  "
          alt="series image"
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${seriesDetails.backdrop_path}`}
          width={1280}
          height={720}
          quality={100}
          priority
        />
        <header className="z-10">
          <h1 className="text-center">{seriesDetails.name}</h1>
          <p className=" text-secondary ">{seriesDetails.tagline}</p>
        </header>
        <div className="z-10 mb-14 flex flex-col lg:flex-row gap-3 ">
          <CtaLink href={`/mediaPlay?seriesId=${seriesDetails.id}`} play>
            Oglądaj
          </CtaLink>
          <div className="flex gap-x-3">
            <RateMediaButton
              isRated={Boolean(ratingStatus)}
              mediaData={seriesDetails}
              mediaType="tv"
              rating={ratingStatus as number}
              userId={Number(session?.user.id)}
            />
            <AddToWatchlistButton
              isInWatchlist={watchlistStatus}
              mediaData={seriesDetails}
              mediaType="tv"
              userId={Number(session?.user.id)}
            />
            <FavoriteButton
              isFavorite={favoriteStatus}
              userId={Number(session?.user.id)}
              mediaData={seriesDetails}
              mediaType="tv"
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 bg-backgroundLight rounded-md md:col-span-2 border border-borderPrimary">
          <h2 className="text-h2 mb-5">Sezony i odcinki</h2>
          <ul className="flex flex-wrap gap-5">
            {seriesDetails.seasons?.map(
              (season: { id: number; episode_count: number }, i: number) => {
                if (i === 0) return;

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
        </div>
        <div className="p-7 bg-backgroundLight rounded-md md:col-start-3 border border-borderPrimary">
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <CiCalendar size={20} /> Rok premiery
            </p>
            <div>{seriesDetails.first_air_date.slice(0, 4)}</div>
          </section>
          <section className="mb-5 ">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <PiTranslate size={20} /> Dostępne języki
            </p>
            <ul className="flex gap-2 flex-wrap">
              {seriesDetails?.spoken_languages?.map(
                (lang: { name: string }) => (
                  <li
                    className="px-2 py-1 bg-background rounded-md border border-zinc-700"
                    key={lang.name}
                  >
                    {lang.name}
                  </li>
                )
              )}
            </ul>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <FaRegStar size={20} /> Oceny
            </p>
            <ul className="flex gap-2 flex-wrap">
              {seriesDetailsFromOmdb?.Ratings?.map(
                (rating: { Source: string; Value: string }) => (
                  <li
                    className="p-2 bg-background rounded-md border border-zinc-700"
                    key={rating.Source}
                  >
                    <p>
                      {rating.Source.includes("Internet")
                        ? "IMDb"
                        : rating.Source}
                    </p>
                    <p className="text-primary">{rating.Value}</p>
                  </li>
                )
              )}
            </ul>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <HiOutlineSquares2X2 size={20} /> Gatunek
            </p>
            <ul className="flex gap-2 flex-wrap">
              {seriesDetails?.genres?.map(
                (genre: { id: number; name: string }) => (
                  <li
                    className="px-2 py-1 bg-background rounded-md border border-zinc-700"
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                )
              )}
            </ul>
          </section>
          {seriesDetailsFromOmdb?.Writer !== "N/A" && (
            <section className="mb-5">
              <p className="text-secondary flex gap-1 items-center mb-3">
                {" "}
                <FaScroll size={20} /> Scenariusz
              </p>
              <ul>
                {seriesDetailsFromOmdb?.Writer?.split(", ").map(
                  (writer: string) => (
                    <li
                      key={writer}
                      className="bg-background rounded-md border border-zinc-700 flex gap-2 p-3 "
                    >
                      <div className="relative h-16 w-16 md:h-20 md:w-20 aspect-square ">
                        <Image
                          alt="Director image"
                          src={
                            getPersonImagePathFromList(
                              writer,
                              mediaMembers.crew
                            )
                              ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${
                                  ProfileSize.MEDIUM
                                }${getPersonImagePathFromList(
                                  writer,
                                  mediaMembers.crew
                                )}`
                              : NoProfilePicture
                          }
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 768px) 70px, (max-width: 1200px) 100px, 120px"
                        />
                      </div>
                      <p className="flex items-center">{writer}</p>
                    </li>
                  )
                )}
              </ul>
            </section>
          )}
        </div>
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-2 border border-borderPrimary">
          <h3 className="text-secondary mb-3">Opis</h3>
          <p className="text-white">{seriesDetails.overview}</p>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md  md:col-start-3 border border-borderPrimary">
          {providers.results?.PL?.flatrate ? (
            <div>
              <h3 className="text-secondary mb-3">Gdzie zobaczyć:</h3>
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
              Ten film nie jest obecnie dostępny na platformach VOD.
            </p>
          )}
        </div>
        <div className="overflow-hidden p-7 bg-backgroundLight rounded-md md:col-span-2 border border-borderPrimary">
          <section className="mb-5">
            <SwiperPeople
              listLabel="Obsada"
              personList={mediaMembers.cast}
              swiperId={uuid()}
            />
          </section>
          <section className="mb-5">
            <SwiperVideo
              listLabel="Zwiastuny i ciekawostki"
              videoList={videoList.results}
              swiperId={uuid()}
            />
          </section>
          <section className="mb-5">
            <SwiperList
              mediaType="movie"
              mediaList={mediaRecommendationsList.results}
              listLabel="Rekomendacje"
              swiperId={uuid()}
            />
          </section>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md md:col-start-3 border border-borderPrimary">
          <h3 className="text-secondary mb-4">Tła</h3>
          <ul className="flex flex-wrap gap-4">
            {imagesList.backdrops
              .slice(0, 16)
              .map(
                (img: { file_path: string; height: number; width: number }) => (
                  <li className=" hover:cursor-pointer" key={img.file_path}>
                    <ImageModal
                      altText="backdrop image"
                      imageUrl={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${img.file_path}`}
                      height={img.height}
                      width={img.width}
                    />
                  </li>
                )
              )}
          </ul>
        </div>
      </section>
      <section className="mb-20">
        <FreeTrialCta />
      </section>
    </PageContainer>
  );
}
