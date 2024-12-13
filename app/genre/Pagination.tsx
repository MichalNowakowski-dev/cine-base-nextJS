"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const paginationStyles = {
  button: "px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-600",
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.replace(`?${params.toString()}`, { scroll: false });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex gap-6 justify-center items-center my-6 ">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={paginationStyles.button}
      >
        Poprzednia
      </button>
      <span>
        Strona {currentPage} z {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={paginationStyles.button}
      >
        Następna
      </button>
    </div>
  );
};

export default Pagination;
