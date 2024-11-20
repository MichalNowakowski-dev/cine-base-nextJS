"use client";

import { usePagination } from "../../hooks/usePagination";
import PaginatedSection from "../PaginatedSection";
import GenresCards from "./GenresCards";

const GENRES_PER_VIEW = 5;

export default function GenresCardsSection({
  genresList,
  children,
  mediaType,
}: {
  genresList: { id: number; name: string; images: string[] }[];
  children: React.ReactNode;
  mediaType: string;
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

      <GenresCards
        genreList={isMobile ? genresList : paginatedList}
        mediaType={mediaType}
        className={`transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
