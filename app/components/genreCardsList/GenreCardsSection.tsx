"use client";

import { GenreWithImages, MediaType } from "@/app/lib/types";
import { usePagination } from "../../hooks/usePagination";
import PaginatedSection from "../ui/PaginatedSection";
import GenreCards from "./GenreCards";

const GENRES_PER_VIEW = 5;

export default function GenreCardsSection({
  genresList,
  children,
  mediaType,
}: {
  genresList: GenreWithImages[];
  children: React.ReactNode;
  mediaType: MediaType;
}) {
  const {
    activePage,
    maxPageListNumber,
    paginatedList,
    isMobile,
    showList,
    handleMoveList,
  } = usePagination(genresList, GENRES_PER_VIEW);

  return (
    <div>
      <PaginatedSection
        activePage={activePage}
        maxPageListNumber={maxPageListNumber}
        handleMoveList={handleMoveList}
      >
        {children}
      </PaginatedSection>

      <GenreCards
        genreList={isMobile ? genresList : paginatedList}
        mediaType={mediaType}
        className={`transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
