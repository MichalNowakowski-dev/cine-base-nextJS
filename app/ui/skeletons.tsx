export const MediaItemSkeleton = () => (
  <li className="text-sm min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px] animate-pulse rounded-md">
    <div className="mb-2 bg-gray-300 w-full h-auto aspect-[2/3] "></div>
    <h4 className="bg-gray-300 h-4 w-2/3 mt-2"></h4>
    <p className="bg-gray-300 h-3 w-1/3 mt-1"></p>
  </li>
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
