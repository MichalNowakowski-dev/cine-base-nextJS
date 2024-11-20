import React from "react";
import SwitchListButtons from "./SwitchListButtons";

type PaginatedSectionProps = {
  children: React.ReactNode;
  activePage: number;
  maxPageListNumber: number;
  handleMoveList: (directlyTo: number) => void;
};

export default function PaginatedSection({
  children,
  activePage,
  maxPageListNumber,
  handleMoveList,
}: PaginatedSectionProps) {
  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        {children}
        {maxPageListNumber > 1 && (
          <SwitchListButtons
            activePage={activePage}
            maxPageListNumber={maxPageListNumber}
            handleMoveList={handleMoveList}
          />
        )}
      </header>
    </div>
  );
}
