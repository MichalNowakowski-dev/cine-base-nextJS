import React from "react";

export default function BreakLine({
  color,
  height,
}: {
  color?: string;
  height?: string;
}) {
  return (
    <div
      className={`bg-${color ? color : "white"} w-full h-[${
        height ? height : "2"
      }px]`}
    ></div>
  );
}
