import React from "react";
import Image from "next/image";

interface WatchlistItem {
  id: number;
  title: string;
  posterPath: string;
}

const WatchlistGrid = ({ items }: { items: WatchlistItem[] }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h2 className="text-xl font-bold text-white mb-4">Do obejrzenia</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${item.posterPath}`}
              alt={item.title}
              width={200}
              height={300}
              className="rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <p className="text-white text-center text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistGrid;
