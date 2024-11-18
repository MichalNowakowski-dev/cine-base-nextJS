"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Tabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("mediaType") || "movie";

  function handleSwitch(newMediaType: string) {
    router.push(`/movies&series?mediaType=${newMediaType}`);
  }

  return (
    <div className="flex p-2 border border-borderPrimary bg-backgroundFooter rounded-md lg:hidden ">
      <button
        onClick={() => handleSwitch("movie")}
        className={`px-6 py-4 rounded-md basis-1/2 ${
          mediaType === "movie"
            ? "bg-backgroundLight text-white"
            : "bg-transparent text-secondary"
        }`}
      >
        Filmy
      </button>
      <button
        onClick={() => handleSwitch("tv")}
        className={`px-6 py-4 rounded-md basis-1/2 ${
          mediaType === "tv"
            ? "bg-backgroundLight text-white"
            : "bg-transparent text-secondary"
        }`}
      >
        Seriale
      </button>
    </div>
  );
}
