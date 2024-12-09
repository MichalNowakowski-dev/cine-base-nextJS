"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { movieGenresList, tvGenresList } from "./searchGenres";
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
  const genresParam = params.get("genres");
  const genres = genresParam ? genresParam.split(",").map(Number) : [];

  useEffect(() => {
    if (params.get("query")) {
      params.delete("query");
      const newQueryString = params.toString();
      const newUrl = `${pathname}?${newQueryString}`;
      router.replace(newUrl, { scroll: false });
    }
    if (!params.get("mediaType")) {
      router.replace(`${pathname}?mediaType=movie`, { scroll: false });
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

  const toggleGenreInUrl = (genreId: number) => {
    // Pobierz aktualną listę gatunków z URL
    const genres = params.get("genres")
      ? params.get("genres")!.split(",").map(Number)
      : [];
    const page = params.get("page");

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
      params.set("genres", genres.join(","));
    } else {
      params.delete("genres");
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
            genres.includes(genre.id)
              ? "bg-blue-700 hover:bg-blue-900"
              : "bg-zinc-400 hover:bg-zinc-600"
          }`}
          key={genre.id}
          onClick={() => toggleGenreInUrl(genre.id)}
        >
          {genre.name}
        </div>
      ));
    } else
      return tvGenresList.map((genre) => (
        <div
          className={`rounded-lg p-2 cursor-pointer ${
            genres.includes(genre.id)
              ? "bg-blue-700 hover:bg-blue-900"
              : "bg-zinc-400 hover:bg-zinc-600"
          }`}
          key={genre.id}
          onClick={() => toggleGenreInUrl(genre.id)}
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
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto w-full max-w-md p-4">
      <div className="flex flex-col gap-2">
        <label className="font-medium">Film/Serial:</label>
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

      <div className="flex flex-col gap-2">
        <label className="font-medium">Kraj produkcji:</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toggleProductionCountryInUrl("pl")}
            className={`py-2 px-4 rounded-full ${
              productionCountry
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Polska
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Od roku:</label>
        <input
          type="number"
          defaultValue={Number(yearFrom) || ""}
          onChange={(e) => updateUrlParam("yearFrom", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Do roku:</label>
        <input
          type="number"
          defaultValue={Number(yearTo) || ""}
          onChange={(e) => updateUrlParam("yearTo", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Oceny od:</label>
        <input
          type="number"
          defaultValue={Number(ratingFrom) || ""}
          onChange={(e) => updateUrlParam("ratingFrom", e.target.value)}
          className="py-2 px-4 rounded-full border text-black border-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Oceny do:</label>
        <input
          type="number"
          defaultValue={Number(ratingTo) || ""}
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
