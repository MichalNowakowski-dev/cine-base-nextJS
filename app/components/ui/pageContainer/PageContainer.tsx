import React from "react";

export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`min-h-screen mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl ${
        className && className
      }`}
    >
      {children}
    </main>
  );
}
