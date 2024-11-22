export const MediaItemSkeleton = () => (
  <li className="text-sm min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px] animate-pulse rounded-md">
    <div className="mb-2 bg-gray-300 w-full h-auto aspect-[2/3] "></div>
    <h4 className="bg-gray-300 h-4 w-2/3 mt-2"></h4>
    <p className="bg-gray-300 h-3 w-1/3 mt-1"></p>
  </li>
);
export const MediaContainerSkeleton = () => (
  <>
    <header className=" flex justify-between items-center mb-4 animate-pulse ">
      <h2 className="bg-gray-300 h-7 w-24"></h2>
      <div className="flex justify-center items-center bg-gray-300 border-none rounded-full p-1 min-w-32 w-48 h-10 animate-pulse"></div>
    </header>
    <MediaScrollListSkeleton />
  </>
);
export const GenresCardListButtonsSkeleton = () => (
  <div className="px-4 py-2 h-10 w-20 bg-gray-300 rounded-md gap-3 animate-pulse "></div>
);
export const GenresCardsSkeleton = () => (
  <ul className="flex justify-between w-full">
    {Array.from({ length: 5 }).map((_) => (
      <li className="w-[220px] h-[220px] rounded-lg bg-gray-300 animate-pulse"></li>
    ))}
  </ul>
);

export const MediaScrollListSkeleton = () => (
  <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
    <ul className="flex gap-3 ">
      {Array.from({ length: 6 }).map((_, index) => (
        <MediaItemSkeleton key={index} />
      ))}
    </ul>
  </div>
);
