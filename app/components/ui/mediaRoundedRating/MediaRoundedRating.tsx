import React, { useEffect, useState } from "react";

type MediaRoundedRatingProps = {
  rating: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const MediaRoundedRating: React.FC<MediaRoundedRatingProps> = ({
  rating,
  size = 30,
  strokeWidth = 3,
  className,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [sizeByViewport, setSizeByVievport] = useState(size);

  const radius = (sizeByViewport - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min((rating / 10) * 100, 100);
  const offset = circumference - (progress / 100) * circumference;

  const colors = {
    bgCircle: "#041226",
    bgProgress: "#919998",
    progress: rating < 5 ? "#7c0703" : rating < 7 ? "#e4d61d" : "#036603",
    text: "#ffffff",
  };

  useEffect(() => {
    setIsClient(true);
    const viewport = window.innerWidth;
    const sizeByViewport =
      viewport < 640 ? 30 : viewport < 768 ? 34 : viewport < 1024 ? 37 : 40;
    setSizeByVievport(sizeByViewport);
  }, []);

  if (!isClient) return null;

  return (
    <svg
      width={sizeByViewport}
      height={sizeByViewport}
      viewBox={`0 0 ${sizeByViewport} ${sizeByViewport}`}
      className={`absolute ${className}`}
    >
      {/* Tło okręgu */}
      <circle
        cx={sizeByViewport / 2}
        cy={sizeByViewport / 2}
        r={radius}
        fill={colors.bgCircle}
        stroke={colors.bgProgress} // kolor tła okręgu
        strokeWidth={strokeWidth}
      />
      {/* Wypełnienie progresu */}
      <circle
        cx={sizeByViewport / 2}
        cy={sizeByViewport / 2}
        r={radius}
        fill="transparent"
        stroke={colors.progress} // kolor progresu
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={sizeByViewport * 0.4}
        fontWeight="bold"
        fill={colors.text}
      >
        {rating.toFixed(1)}
      </text>
    </svg>
  );
};

export default MediaRoundedRating;
