// import {
//   fetchMediaByID,
//   fetchProviders,
//   fetchMediaCast,
//   fetchRecommendationsList,
//   fetchSimilarList,
//   fetchVideosList,
//   fetchImages,
// } from "@/app/lib/data";

import Image from "next/image";
import { FaPlay, FaThumbsUp, FaRegHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // const movieDetails = await fetchMediaByID(id, "movie");
  // const providers = await fetchProviders(id, "movie");
  // const movieCast = await fetchMediaCast(id, "movie");
  // const movieRecommendationsList = await fetchRecommendationsList(id, "movie");
  // const movieSimilarList = await fetchSimilarList(id, "movie");
  // const videoList = await fetchVideosList(id, "movie");
  // const imagesList = await fetchImages(id, "movie");
  // after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_#141414_100%),_linear-gradient(to_top,_transparent_0%,_#141414_100%)]
  return (
    <main className="mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl ">
      <section className="flex flex-col justify-end items-center gap-y-4 h-[70vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_100%),_linear-gradient(to_top,_#141414_0%,_transparent_50%)]">
        <Image
          className="absolute object-cover top-0 left-0 rounded-md -z-10  "
          alt="movie image"
          src={
            "https://image.tmdb.org/t/p/original//zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg"
          }
          width={1600}
          height={900}
        />
        <header className="z-10 text-center">
          <h1>Skazani na Shawshank</h1>
          <p className="text-secondary px-20">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            aspernatur a alias optio voluptatum, facere quae laudantium earum
            autem ipsam itaque porro dolores placeat fugiat consequuntur nobis
            rem id ullam?
          </p>
        </header>
        <div className="z-10 mb-16 flex gap-x-3">
          <button className="flex gap-x-1 items-center justify-center bg-red-600 text-white rounded-md py-2 px-4">
            <FaPlay />
            Play Now
          </button>
          <div className="flex gap-x-3">
            <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800">
              <FaThumbsUp size={20} />
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800">
              <IoMdAdd size={20} />
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800">
              <FaRegHeart size={20} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
