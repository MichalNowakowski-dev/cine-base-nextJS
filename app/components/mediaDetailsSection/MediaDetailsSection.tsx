import {
  Genre,
  MediaItem,
  MediaOmdbItem,
  MediaPerson,
} from "@/app/types/types";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegStar, FaScroll } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiFilmScript, PiTranslate } from "react-icons/pi";
import ContributorList from "../contributorList/ContributorList";

export default function MediaDetailsSection({
  mediaDetails,
  className,
  mediaDetailsFromOmdb,
  mediaCrew,
  mediaType,
}: {
  mediaDetails: MediaItem;
  className: string;
  mediaDetailsFromOmdb: MediaOmdbItem;
  mediaCrew: MediaPerson[];
  mediaType: "movie" | "tv";
}) {
  const {
    release_date,
    first_air_date,
    spoken_languages,
    vote_average,
    genres,
  } = mediaDetails;

  const isMovie = mediaType === "movie";

  return (
    <div className={`${className}`}>
      <section className="mb-5">
        <p className="text-secondary flex gap-1 items-center mb-3">
          <CiCalendar size={20} />
          <span>Rok premiery</span>
        </p>
        <div>
          {!isMovie ? first_air_date?.slice(0, 4) : release_date?.slice(0, 4)}
        </div>
      </section>
      <section className="mb-5 ">
        <p className="text-secondary flex gap-1 items-center mb-3">
          <PiTranslate size={20} />
          <span>Dostępne języki</span>
        </p>
        <ul className="flex gap-2 flex-wrap">
          {spoken_languages &&
            spoken_languages.map((lang: { name: string }) => (
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
          <FaRegStar size={20} />
          <span>Oceny</span>
        </p>
        <ul className="flex gap-2 flex-wrap">
          {mediaDetailsFromOmdb.Ratings &&
            mediaDetailsFromOmdb.Ratings.map(
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
          <li className="p-2 bg-background rounded-md border border-zinc-700">
            <p>TMDB</p>
            <p className="text-primary">{vote_average}</p>
          </li>
        </ul>
      </section>
      <section className="mb-5">
        <p className="text-secondary flex gap-1 items-center mb-3">
          <HiOutlineSquares2X2 size={20} />
          <span>Gatunek</span>
        </p>
        <ul className="flex gap-2 flex-wrap">
          {genres &&
            genres?.map((genre: Genre) => (
              <li
                className="px-2 py-1 bg-background rounded-md border border-zinc-700"
                key={genre.id}
              >
                {genre.name}
              </li>
            ))}
        </ul>
      </section>
      {isMovie && mediaDetailsFromOmdb.Director && (
        <section className="mb-5">
          <p className="text-secondary flex gap-1 items-center mb-3">
            <PiFilmScript size={20} />
            <span>Reżyseria</span>
          </p>
          <ContributorList
            persons={mediaDetailsFromOmdb.Director}
            mediaCrew={mediaCrew}
          />
        </section>
      )}
      {mediaDetailsFromOmdb.Writer && (
        <section className="mb-5">
          <p className="text-secondary flex gap-1 items-center mb-3">
            <FaScroll size={20} />
            <span>Scenariusz</span>
          </p>
          <ContributorList
            persons={mediaDetailsFromOmdb.Writer}
            mediaCrew={mediaCrew}
          />
        </section>
      )}
    </div>
  );
}
