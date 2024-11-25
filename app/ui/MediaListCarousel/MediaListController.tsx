"use client";

import { MediaItem, MediaType } from "@/app/lib/types";
import { usePagination } from "../../hooks/usePagination";
import PaginatedSection from "../PaginatedSection";
import MediaList from "./MediaList";

const ITEMS_PER_VIEW = 5;

export default function MediaListController({
  list,
  mediaType,
  children,
  itemsPerViewNumber,
}: {
  list: MediaItem[];
  mediaType?: MediaType;
  children: React.ReactNode;
  itemsPerViewNumber?: number;
}) {
  const {
    activePage,
    maxPageListNumber,
    paginatedList,
    isMobile,
    showList,
    handleMoveList,
  } = usePagination(list, itemsPerViewNumber || ITEMS_PER_VIEW);

  return (
    <div>
      <PaginatedSection
        activePage={activePage}
        maxPageListNumber={maxPageListNumber}
        handleMoveList={handleMoveList}
      >
        {children}
      </PaginatedSection>

      <MediaList
        mediaType={mediaType}
        list={isMobile ? list : paginatedList}
        className={`transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
