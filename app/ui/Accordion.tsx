"use client";
import { useState, useRef, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface AccordionProps {
  number: string;
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ number, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [answerHeight, setAnswerHeight] = useState("0px");

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setAnswerHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <li className="mb-4 relative border-gradient-bottom md:basis-[45%]">
      <button
        className="flex justify-between items-center w-full text-left py-3 px-2"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <span className="bg-backgroundLight rounded-lg w-12 h-12 flex items-center justify-center mr-3">
            {number}
          </span>
          <h3 className="font-normal text-lg">{question}</h3>
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
        style={{ maxHeight: answerHeight }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <p className="text-secondary px-2 py-2 mb-5">{answer}</p>
      </div>
    </li>
  );
};

export default Accordion;
