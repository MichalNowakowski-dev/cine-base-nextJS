"use client";

import { useState, useEffect } from "react";

const DESKTOP_VIEWPORT = 1024;

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [activePage, setActivePage] = useState(1);
  const [showList, setShowList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [paginatedList, setPaginatedList] = useState(
    items.slice(0, itemsPerPage)
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < DESKTOP_VIEWPORT);
    }
    handleResize(); // inicjalizacja
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPaginatedList(
      items.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
    );
  }, [activePage, items, itemsPerPage]);

  const maxPageListNumber = Math.ceil(items.length / itemsPerPage);

  function handleMoveList(direction: string, directlyTo?: number) {
    if (directlyTo) {
      setShowList(false);
      setTimeout(() => {
        setActivePage(directlyTo);
        setShowList(true);
      }, Number(process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME));
    } else {
      if (
        (activePage === 1 && direction === "left") ||
        (activePage === maxPageListNumber && direction === "right")
      ) {
        return;
      }
      setShowList(false);
      const offset = direction === "right" ? 1 : -1;
      setTimeout(() => {
        setActivePage((prev) => prev + offset);
        setShowList(true);
      }, Number(process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME));
    }
  }

  return {
    activePage,
    maxPageListNumber,
    paginatedList,
    isMobile,
    showList,
    handleMoveList,
  };
}
