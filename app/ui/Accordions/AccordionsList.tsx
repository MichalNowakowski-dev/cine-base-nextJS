"use client";

import Accordion from "./Accordion";

interface AccordionData {
  question: string;
  answer: string;
}

const accordionData: AccordionData[] = [
  {
    question: "Czym jest CineBase?",
    answer:
      "CineBase to usługa przesyłania strumieniowego umożliwiająca oglądanie filmów i programów na żądanie. Możesz również dowiedzieć się paru cennych informacjii o filmach czy serialach.",
  },
  {
    question: "Ile kosztuje korzystanie z CineBase?",
    answer:
      "CineBase jest darmowy do przeglądania i eksplorowania informacji o filmach. Jednak niektóre zaawansowane funkcje mogą wymagać subskrypcji lub dodatkowych opłat w przyszłości.",
  },
  {
    question: "Co oferuje CineBase?",
    answer:
      "CineBase oferuje ogromną bibliotekę filmów, programów telewizyjnych, dokumentów i ekskluzywnych treści z różnych gatunków, dostępnych na żądanie.",
  },
  {
    question: "Gdzie mogę oglądać CineBase?",
    answer:
      "Możesz oglądać CineBase na różnych urządzeniach, w tym smartfonach, tabletach, telewizorach smart TV i komputerach. Po prostu pobierz aplikację lub odwiedź naszą stronę internetową, aby rozpocząć przesyłanie strumieniowe.",
  },
  {
    question: "Jak się zarejestrować w CineBase?",
    answer:
      "Rejestracja w CineBase jest prosta. Wystarczy odwiedzić naszą stronę internetową, kliknąć przycisk „Zarejestruj się” i postępować zgodnie z instrukcjami, aby utworzyć konto.",
  },
  {
    question: "Co oznacza okres próbny?",
    answer:
      "CineBase oferuje nowym użytkownikom bezpłatny okres próbny, umożliwiający zapoznanie się z platformą i jej treścią przed podjęciem decyzji o wykupieniu subskrypcji.",
  },
];

const AccordionList = () => {
  return (
    <div>
      <ul className="block md:hidden">
        {accordionData.map((item, index) => (
          <Accordion
            key={index}
            number={"0" + (index + 1)}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </ul>

      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <ul>
          {accordionData
            .slice(0, Math.ceil(accordionData.length / 2))
            .map((item, index) => (
              <Accordion
                key={index}
                number={"0" + (index + 1)}
                question={item.question}
                answer={item.answer}
              />
            ))}
        </ul>

        <ul>
          {accordionData
            .slice(Math.ceil(accordionData.length / 2))
            .map((item, index) => (
              <Accordion
                key={index + Math.ceil(accordionData.length / 2)}
                number={"0" + (index + Math.ceil(accordionData.length / 2) + 1)}
                question={item.question}
                answer={item.answer}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AccordionList;
