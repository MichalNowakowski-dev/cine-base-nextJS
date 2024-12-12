"use client";
import { useState, useRef, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface AccordionProps {
  number?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Accordion = ({ number, title, children, className }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [childrenHeight, setChildrenHeight] = useState("0px");

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setChildrenHeight(
        isOpen ? `${contentRef.current.scrollHeight}px` : "0px"
      );
    }
  }, [isOpen]);

  return (
    <div
      className={`mb-4 relative border-gradient-bottom ${
        className && className
      }`}
    >
      <button
        className="flex justify-between items-center w-full text-left py-3 px-2"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <span className="bg-backgroundLight rounded-lg w-12 h-12 flex items-center justify-center mr-3">
            {number}
          </span>

          <h3 className="font-normal text-lg">{title}</h3>
        </div>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? <FaMinus size={20} /> : <FaPlus size={20} />}
        </span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: childrenHeight }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="text-secondary px-2 py-2 mb-5">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
