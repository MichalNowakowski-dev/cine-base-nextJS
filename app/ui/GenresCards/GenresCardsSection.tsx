"use client";

import { useState } from "react";
import GenresCards from "./GenresCards";
import GenresCardListButtons from "./GenresCardListButtons";

export default function GenresCardsSection({
  genresList,
}: {
  genresList: { id: number; name: string; images: string[] }[];
}) {
  const GENRES_PER_VIEW = 5;
  const FADE_ANIMATION_TIME = 0.3;
  const [activePage, setActivePage] = useState(1);
  const [showList, setShowList] = useState(true);

  const [currentList, setCurrentList] = useState(
    genresList.slice(
      (activePage - 1) * GENRES_PER_VIEW,
      activePage * GENRES_PER_VIEW
    )
  );

  const maxPageListNumber = Math.ceil(genresList.length / GENRES_PER_VIEW);

  function handleMoveList(direction: string) {
    if (activePage === 1 && direction === "left") return;
    if (activePage === maxPageListNumber && direction === "right") return;
    setShowList(false);

    setTimeout(() => {
      if (direction === "right" && activePage < maxPageListNumber) {
        setActivePage((prevState) => {
          const newActivePage = prevState + 1;
          setCurrentList(
            genresList.slice(
              (newActivePage - 1) * GENRES_PER_VIEW,
              newActivePage * GENRES_PER_VIEW
            )
          );
          setShowList(true);
          return newActivePage;
        });
      } else if (direction === "left" && activePage > 1) {
        setActivePage((prevState) => {
          const newActivePage = prevState - 1;
          setCurrentList(
            genresList.slice(
              (newActivePage - 1) * GENRES_PER_VIEW,
              newActivePage * GENRES_PER_VIEW
            )
          );
          setShowList(true);
          return newActivePage;
        });
      }
    }, FADE_ANIMATION_TIME * 1000);
  }

  return (
    <section className="flex flex-wrap gap-6 px-4 mb-8">
      <div className="flex items-center justify-between w-full">
        <header>
          <h2 className="text-2xl mb-2">
            Eksploruj nasz szeroki wybór kategorii
          </h2>
          <p className="text-sm text-secondary w-2/3">
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
        genreList={currentList}
        className={`transition-opacity duration-500 ${
          showList ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
