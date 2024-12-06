import {
  fetchMediaByID,
  fetchMovieByIDfromOMDB,
  fetchMediaData,
} from "@/app/lib/api/tmdbApi";

import NoProfilePicture from "@/public/no-profile-img.png";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { PiTranslate, PiFilmScript } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaRegStar, FaScroll } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import CtaLink from "@/app/components/ui/ctaLink/CtaLink";
import ImageModal from "@/app/components/imageModal/ImageModal";

import FreeTrialCta from "@/app/components/ui/freeTrialCta/FreeTrialCta";
import {
  BackdropSize,
  Genre,
  LogoSize,
  MediaItem,
  ProfileSize,
} from "@/app/types/types";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import FavoriteButton from "@/app/components/ui/addToFavBtn/AddToFavoriteBtn";
import AddToWatchlistButton from "@/app/components/ui/addToWatchBtn/AddToWatchlistButton";
import { fetchUserMediaStatus } from "@/app/lib/api/userApi";
import { auth } from "@/app/auth";
import { getPersonImagePathFromList } from "@/app/lib/utils";
import { styles } from "@/app/styles";
import RateMediaButton from "@/app/components/ui/RateMediaBtn/RateMediaBtn";
import SwiperList from "@/app/components/Swiper/SwiperList";
import SwiperPeople from "@/app/components/Swiper/SwiperPeople";
import SwiperVideo from "@/app/components/Swiper/SwiperVideo";

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

  const session = await auth();
  const { favoriteStatus, watchlistStatus, ratingStatus } =
    await fetchUserMediaStatus(
      movieDetails.id,
      Number(session?.user?.id),
      "movie"
    );

  return (
    <PageContainer>
      <section className={styles.headerSection}>
        <Image
          className="absolute object-cover top-0 left-0 rounded-md -z-10 h-full"
          alt="movie image"
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${movieDetails.backdrop_path}`}
          width={1280}
          height={720}
          quality={100}
        />

        <header className="z-10 text-center">
          <h1>{movieDetails.title}</h1>
          <p className="hidden md:block text-secondary px-20 ">
            {movieDetails.tagline}
          </p>
        </header>
        <div className="z-10 mb-14 flex flex-col md:flex-row gap-3 ">
          <CtaLink href={`/mediaPlay?movieId=${movieDetails.id}`} play>
            Oglądaj
          </CtaLink>
          <div className="flex gap-x-3">
            <RateMediaButton
              isRated={Boolean(ratingStatus)}
              mediaData={movieDetails}
              mediaType="movie"
              rating={ratingStatus as number}
              userId={Number(session?.user.id)}
            />
            <AddToWatchlistButton
              isInWatchlist={watchlistStatus}
              mediaData={movieDetails}
              mediaType="movie"
              userId={Number(session?.user.id)}
            />
            <FavoriteButton
              isFavorite={favoriteStatus}
              mediaData={movieDetails}
              mediaType="movie"
              userId={Number(session?.user.id)}
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-2">
          <h3 className="text-secondary mb-3">Opis</h3>
          <p className="text-white">{movieDetails.overview}</p>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md  md:col-start-3">
          {providers.results?.PL?.flatrate || providers.results?.PL?.rent ? (
            <>
              <div className="mb-7">
                <h3 className="text-secondary mb-3">
                  Gdzie jeszcze można zobaczyć:
                </h3>
                <ul className="flex gap-3">
                  {providers.results?.PL?.flatrate?.map(
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
                </ul>
              </div>
              <div>
                <h3 className="text-secondary mb-3">Gdzie można wypożyczyć:</h3>
                <ul className="flex gap-3">
                  {providers.results?.PL?.rent?.map(
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
              Ten film nie jest obecnie dostępny na platformach VOD.
            </p>
          )}
        </div>
        <div className="p-7 bg-backgroundLight rounded-md ">
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <CiCalendar size={20} /> Rok premiery
            </p>
            <div>{movieDetails?.release_date?.slice(0, 4)}</div>
          </section>
          <section className="mb-5 ">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <PiTranslate size={20} /> Dostępne języki
            </p>
            <ul className="flex gap-2 flex-wrap">
              {movieDetails?.spoken_languages?.map((lang: { name: string }) => (
                <li
                  className="px-2 py-1 bg-background rounded-md border border-zinc-700"
                  key={lang.name}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <FaRegStar size={20} /> Oceny
            </p>
            <ul className="flex gap-2 flex-wrap">
              {movieDetailsFromOmdb.Ratings.map(
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
              {movieDetails?.genres?.map((genre: Genre) => (
                <li
                  className="px-2 py-1 bg-background rounded-md border border-zinc-700"
                  key={genre.id}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <PiFilmScript size={20} /> Reżyseria
            </p>
            <ul>
              {movieDetailsFromOmdb.Director.split(", ").map(
                (director: string) => (
                  <li
                    key={director}
                    className="bg-background rounded-md border border-zinc-700 flex gap-2 p-3 "
                  >
                    <div className="relative h-16 w-16 md:h-20 md:w-20 aspect-square ">
                      <Image
                        alt="Script person profile"
                        src={
                          director
                            ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${
                                ProfileSize.MEDIUM
                              }${getPersonImagePathFromList(
                                director,
                                mediaMembers.crew
                              )}`
                            : NoProfilePicture
                        }
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 70px, (max-width: 1200px) 100px, 120px"
                      />
                    </div>
                    <p className="flex items-center">{director}</p>
                  </li>
                )
              )}
            </ul>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <FaScroll size={20} /> Scenariusz
            </p>
            <ul>
              {movieDetailsFromOmdb.Writer.split(", ").map((writer: string) => (
                <li
                  key={writer}
                  className="bg-background rounded-md border border-zinc-700 flex gap-2 p-3 "
                >
                  <div className="relative h-16 w-16 md:h-20 md:w-20 aspect-square ">
                    <Image
                      alt="Script person profile"
                      src={
                        getPersonImagePathFromList(writer, mediaMembers.crew)
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
              ))}
            </ul>
          </section>
        </div>
        <div className="overflow-hidden p-7 bg-backgroundLight rounded-md md:col-span-2">
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
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-full border border-borderPrimary">
          <h3 className="text-secondary mb-4">Tła</h3>
          <ul className="flex flex-wrap gap-2">
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
