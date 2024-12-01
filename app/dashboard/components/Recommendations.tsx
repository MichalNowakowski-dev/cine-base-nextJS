import React from "react";
import Image from "next/image";

interface Recommendation {
  id: number;
  title: string;
  posterPath: string;
}

const Recommendations = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h2 className="text-xl font-bold text-white mb-4">Polecane dla Ciebie</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex-shrink-0 w-40 group">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${rec.posterPath}`}
              alt={rec.title}
              width={160}
              height={240}
              className="rounded-md"
            />
            <p className="text-white text-sm mt-2 text-center">{rec.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
