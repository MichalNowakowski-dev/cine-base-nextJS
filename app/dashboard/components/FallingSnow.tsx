"use client";
import { useEffect, useState } from "react";

const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: `${Math.ceil(Math.random() * 100)}vw`, // losowe położenie poziome
      delay: `${(Math.random() * 5).toFixed(1)}s`, // losowe opóźnienie
      duration: `${(2 + Math.random() * 4).toFixed(1)}s`, // losowa prędkość
    });
  }

  console.log("Generated stars:", stars); // Sprawdź w konsoli
  return stars;
};

export default function FallingSnow({ count = 30 }: { count?: number }) {
  const [stars, setStars] = useState<
    { id: number; left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    setStars(generateStars(count));
  }, [count]);

  return (
    <div className="">
      {stars.length > 1 &&
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute top-0 w-1 h-1 bg-white rounded-full animate-fallingStar"
            style={{
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
    </div>
  );
}
