"use client";

import { useState, useEffect } from "react";
import GenresCards from "./GenresCards";
import GenresCardListButtons from "./GenresCardListButtons";

const GENRES_PER_VIEW = 5;

export default function GenresCardsSection({
  genresList,
}: {
  genresList: { id: number; name: string; images: string[] }[];
}) {
  const [activePage, setActivePage] = useState(1);
  const [showList, setShowList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [paginatedList, setPaginatedList] = useState(
    genresList.slice(
      (activePage - 1) * GENRES_PER_VIEW,
      activePage * GENRES_PER_VIEW
    )
  );

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767);
    function handleResize() {
      setIsMobile(window.innerWidth <= 767);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxPageListNumber = Math.ceil(genresList.length / GENRES_PER_VIEW);

  function handleMoveList(direction: string) {
    if (
      (activePage === 1 && direction === "left") ||
      (activePage === maxPageListNumber && direction === "right")
    ) {
      return;
    }
    setShowList(false);
    const offset = direction === "right" ? 1 : -1;
    setTimeout(() => {
      updatePageAndList(activePage + offset);
      setShowList(true);
    }, Number(process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME));
  }

  function updatePageAndList(newPage: number) {
    setActivePage(newPage);
    setPaginatedList(
      genresList.slice(
        (newPage - 1) * GENRES_PER_VIEW,
        newPage * GENRES_PER_VIEW
      )
    );
  }

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <header className="text-center md:text-start">
          <h2 className="text-2xl mb-2">
            Eksploruj nasz szeroki wybór kategorii
          </h2>
          <p className="text-sm text-secondary md:w-2/3">
            Niezależnie od tego, czy szukasz komedii, która Cię rozśmieszy,
            dramatu, który zmusi Cię do myślenia, czy dokumentu, który pozwoli
            Ci dowiedzieć się czegoś nowego
          </p>
        </header>

        <GenresCardListButtons
          handleMoveList={handleMoveList}
          activePage={activePage}
          maxPageListNumber={maxPageListNumber}
        />
      </div>
      <GenresCards
        genreList={isMobile ? genresList : paginatedList}
        className={`transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
