import {
  fetchMediaByID,
  fetchProviders,
  fetchMediaCast,
  fetchRecommendationsList,
  fetchSimilarList,
  fetchGenresList,
  fetchVideosList,
  fetchImages,
  fetchMovieByIDfromOMDB,
} from "@/app/lib/data";

import NoProfilePicture from "@/public/no-profile-img.png";

import Image from "next/image";
import { FaPlay, FaThumbsUp, FaRegHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { PiTranslate, PiFilmScript } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaRegStar, FaMusic } from "react-icons/fa";
import { getImgUrl } from "@/app/lib/utils";
import CastCarousel from "@/app/ui/CastCarousel";
import VideoModalContainer from "@/app/ui/VideoCarousel/VideoModalConainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movieDetails = await fetchMediaByID(id, "movie");
  const movieDetailsFromOmdb = await fetchMovieByIDfromOMDB(
    movieDetails.imdb_id
  );
  const providers = await fetchProviders(id, "movie");
  const genres = await fetchGenresList();
  const movieCast = await fetchMediaCast(id, "movie");
  const movieRecommendationsList = await fetchRecommendationsList(id, "movie");
  const movieSimilarList = await fetchSimilarList(id, "movie");
  const videoList = await fetchVideosList(id, "movie");
  const imagesList = await fetchImages(id, "movie");

  function getPersonImagePath(personName: string) {
    if (personName.includes(",")) {
      const authorName = personName.split(", ")[0];
      const [person] = movieCast.crew.filter(
        (person: any) => person.name === authorName
      );
      return person.profile_path;
    } else {
      const [person] = movieCast.crew.filter(
        (person: any) => person.name === personName
      );
      return person.profile_path;
    }
  }

  return (
    <main className="min-h-screen mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl ">
      <section className="flex flex-col justify-end items-center gap-y-4 h-[70vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_100%),_linear-gradient(to_top,_#141414_0%,_transparent_50%)] mb-6">
        <Image
          className="absolute object-cover top-0 left-0 rounded-md -z-10 h-full  "
          alt="movie image"
          src={getImgUrl("original", movieDetails.backdrop_path)}
          width={1600}
          height={900}
        />
        <header className="z-10 text-center">
          <h1>{movieDetails.title}</h1>
          <p className="hidden md:block text-secondary px-20 ">
            {movieDetails.tagline}
          </p>
        </header>
        <div className="z-10 mb-14 flex flex-col gap-3 ">
          <button className="flex gap-x-1 items-center justify-center bg-red-600 text-white rounded-md py-2 px-4">
            <FaPlay />
            Oglądaj
          </button>
          <div className="flex gap-x-3">
            <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800">
              <FaThumbsUp size={20} />
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800">
              <IoMdAdd size={20} />
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800">
              <FaRegHeart size={20} />
            </button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-2">
          <h3 className="text-secondary mb-3">Opis</h3>
          <p className="text-white">{movieDetails.overview}</p>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md  md:col-start-3">
          {providers.results?.PL?.flatrate || providers.results?.PL?.rent ? (
            <>
              <div className="mb-7">
                <h3 className="text-secondary mb-3">Gdzie zobaczyć:</h3>
                <ul className="flex gap-3">
                  {providers.results?.PL?.flatrate?.map((item: any) => (
                    <li key={item.provider_id}>
                      <Image
                        className="rounded-md"
                        height={40}
                        width={40}
                        alt="provider logo"
                        src={getImgUrl("w45", item.logo_path)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-secondary mb-3">Gdzie wypożyczyć:</h3>
                <ul className="flex gap-3">
                  {providers.results?.PL?.rent?.map((item: any) => (
                    <li key={item.provider_id}>
                      <Image
                        className="rounded-md"
                        height={40}
                        width={40}
                        alt="provider logo"
                        src={getImgUrl("w45", item.logo_path)}
                      />
                    </li>
                  ))}
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
            <div>{movieDetails.release_date.slice(0, 4)}</div>
          </section>
          <section className="mb-5 ">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <PiTranslate size={20} /> Dostępne języki
            </p>
            <ul className="flex gap-2 flex-wrap">
              {movieDetails.spoken_languages.map((lang: any) => (
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
              {movieDetailsFromOmdb.Ratings.map((rating: any) => (
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
              ))}
            </ul>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <HiOutlineSquares2X2 size={20} /> Gatunek
            </p>
            <ul className="flex gap-2 flex-wrap">
              {movieDetails.genres.map((genre: any) => (
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
            <div className="bg-background rounded-md border border-zinc-700 flex gap-2 p-3 ">
              <div className="relative h-16 w-16 md:h-20 md:w-20 aspect-square ">
                <Image
                  alt="Director image"
                  src={
                    movieDetailsFromOmdb.Director
                      ? getImgUrl(
                          "w185",
                          getPersonImagePath(movieDetailsFromOmdb.Director)
                        )
                      : NoProfilePicture
                  }
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 70px, (max-width: 1200px) 100px, 120px"
                />
              </div>
              <p className="flex items-center">
                {movieDetailsFromOmdb.Director}
              </p>
            </div>
          </section>
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <FaMusic size={20} /> Scenariusz
            </p>
            <div className="bg-background rounded-md border border-zinc-700 flex gap-2 p-3 ">
              <div className="relative h-16 w-16 md:h-20 md:w-20 aspect-square ">
                <Image
                  alt="Director image"
                  src={
                    movieDetailsFromOmdb.Writer
                      ? getImgUrl(
                          "w185",
                          getPersonImagePath(movieDetailsFromOmdb.Writer)
                        )
                      : NoProfilePicture
                  }
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 70px, (max-width: 1200px) 100px, 120px"
                />
              </div>
              <p className="flex items-center">
                {movieDetailsFromOmdb.Director}
              </p>
            </div>
          </section>
        </div>
        <div className="overflow-hidden p-7 bg-backgroundLight rounded-md md:col-span-2">
          <section className="mb-5">
            <h3 className="text-secondary mb-3 flex items-center justify-start gap-1">
              Obsada
            </h3>
            <CastCarousel list={movieCast.cast} />
          </section>
          <section className="mb-5">
            <h3 className="text-secondary mb-3 flex items-center justify-start gap-1">
              Zwiastuny i ciekawostki
            </h3>
            <VideoModalContainer list={videoList.results} />
          </section>
        </div>
      </section>
    </main>
  );
}
