"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { countriesAndLanguages, movieGenresList, tvGenresList } from "./data";
import React, { useEffect } from "react";

export default function AdvancedSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const mediaType = params.get("mediaType");
  const productionCountry = params.get("productionCountry");
  const yearFrom = params.get("yearFrom")?.toString();
  const yearTo = params.get("yearTo")?.toString();
  const ratingFrom = params.get("ratingFrom")?.toString();
  const ratingTo = params.get("ratingTo")?.toString();
  const movieGenresParam = params.get("movie-genres");
  const movieGenres = movieGenresParam
    ? movieGenresParam.split(",").map(Number)
    : [];
  const tvGenresParam = params.get("tv-genres");
  const tvGenres = tvGenresParam ? tvGenresParam.split(",").map(Number) : [];

  useEffect(() => {
    if (params.get("query")) {
      params.delete("query");
      const newQueryString = params.toString();
      const newUrl = `${pathname}?${newQueryString}`;
      router.replace(newUrl, { scroll: false });
    }
    if (!params.get("mediaType")) {
      params.set("mediaType", "movie");
      const newQueryString = params.toString();
      const newUrl = `${pathname}?${newQueryString}`;
      router.replace(`${newUrl}`, { scroll: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    const newUrl = `${pathname}?mediaType=movie&type=filters`;
    router.replace(newUrl, { scroll: false });
  };

  const toggleMediaTypeInUrl = (mediaType: string) => {
    const media = params.get("mediaType");
    if (media === mediaType) return;

    params.set("mediaType", mediaType);

    const newQueryString = params.toString();
    const newUrl = `${pathname}?${newQueryString}`;
    router.replace(newUrl, { scroll: false });
  };
  const toggleProductionCountryInUrl = (productionCountry: string) => {
    const country = params.get("productionCountry");
    if (country === productionCountry) {
      params.delete("productionCountry");
    } else {
      params.set("productionCountry", productionCountry);
    }

    const newQueryString = params.toString();
    const newUrl = `${pathname}?${newQueryString}`;
    router.replace(newUrl, { scroll: false });
  };

  const toggleGenreInUrl = (genreId: number, mediaType: string) => {
    // Pobierz aktualną listę gatunków z URL
    // const genres = params.get("genres")
    //   ? params.get("genres")!.split(",").map(Number)
    //   : [];
    const page = params.get("page");
    let genres;
    if (mediaType === "movie") {
      genres = movieGenres;
    } else {
      genres = tvGenres;
    }

    // Sprawdź, czy gatunek już istnieje w URL
    const genreIndex = genres.indexOf(genreId);
    if (genreIndex > -1) {
      // Usuń gatunek, jeśli już istnieje
      genres.splice(genreIndex, 1);
    } else {
      // Dodaj gatunek, jeśli go nie ma
      genres.push(genreId);
    }

    // Zaktualizuj parametr `genres` w URL
    if (genres.length > 0) {
      params.set(`${mediaType}-genres`, genres.join(","));
    } else {
      params.delete(`${mediaType}-genres`);
    }
    if (!page || page !== "1") {
      params.delete("page");
    }

    // Aktualizuj URL
    const newQueryString = params.toString();
    const newUrl = `${pathname}?${newQueryString}`;
    router.replace(newUrl, { scroll: false });
  };

  const renderGenres = (mediaType: string) => {
    if (mediaType === "movie") {
      return movieGenresList.map((genre) => (
        <div
          className={`rounded-lg p-2 cursor-pointer ${
            movieGenres.includes(genre.id)
              ? "bg-blue-700 hover:bg-blue-900"
              : "bg-zinc-400 hover:bg-zinc-600"
          }`}
          key={genre.id}
          onClick={() => toggleGenreInUrl(genre.id, mediaType)}
        >
          {genre.name}
        </div>
      ));
    } else
      return tvGenresList.map((genre) => (
        <div
          className={`rounded-lg p-2 cursor-pointer ${
            tvGenres.includes(genre.id)
              ? "bg-blue-700 hover:bg-blue-900"
              : "bg-zinc-400 hover:bg-zinc-600"
          }`}
          key={genre.id}
          onClick={() => toggleGenreInUrl(genre.id, mediaType)}
        >
          {genre.name}
        </div>
      ));
  };

  const updateUrlParam = (name: string, value: string) => {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto w-full max-w-xl p-4">
      <div className="flex flex-col gap-2 col-span-full">
        <label className="font-medium">Typ:</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toggleMediaTypeInUrl("movie")}
            className={`py-2 px-4 rounded-full ${
              mediaType === "movie"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Film
          </button>
          <button
            type="button"
            onClick={() => toggleMediaTypeInUrl("tv")}
            className={`py-2 px-4 rounded-full ${
              mediaType === "tv"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Serial
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <label className="font-medium">Kraj produkcji:</label>
        <ul className="flex flex-wrap gap-2">
          {countriesAndLanguages.map((item) => (
            <li key={item.lang}>
              <button
                type="button"
                onClick={() => toggleProductionCountryInUrl(item.lang)}
                className={`py-2 px-4 rounded-full ${
                  productionCountry === item.lang
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Od roku:</label>
        <input
          type="number"
          defaultValue={Number(yearFrom) || 1890}
          onChange={(e) => updateUrlParam("yearFrom", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Do roku:</label>
        <input
          type="number"
          defaultValue={Number(yearTo) || new Date().getFullYear()}
          onChange={(e) => updateUrlParam("yearTo", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Ocena od:</label>
        <input
          type="number"
          defaultValue={Number(ratingFrom) || 0}
          onChange={(e) => updateUrlParam("ratingFrom", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Ocena do:</label>
        <input
          type="number"
          defaultValue={Number(ratingTo) || 10}
          onChange={(e) => updateUrlParam("ratingTo", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <label className="font-medium">Gatunki:</label>
        <div className="flex flex-wrap gap-2">
          {renderGenres(mediaType || "movie")}
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors col-span-full"
      >
        Resetuj filtry
      </button>
    </form>
  );
}
