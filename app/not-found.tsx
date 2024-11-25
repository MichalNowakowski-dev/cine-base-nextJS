"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen bg-notFoundBg bg-center flex flex-col items-center justify-center ">
      <div className=" flex flex-col items-center h-full w-full p-6 justify-center bg-black/50 text-white text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">
          Oops! Strona której szukasz nie istnieje.
        </p>
        <Link
          href="/"
          className="px-6 py-3 text-lg font-medium text-gray-900 bg-white rounded-md hover:bg-gray-300"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
