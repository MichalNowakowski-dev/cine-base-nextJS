"use client";
import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptEssential = () => {
    localStorage.setItem("cookieConsent", "essential");
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-between items-center z-50">
      <p className="text-sm mb-2 md:mb-0">
        Ta strona używa plików cookies do zapewnienia podstawowego działania
        aplikacji oraz opcjonalnych plików do analityki i personalizacji. Więcej
        informacji w naszej{" "}
        <a
          href="/privacy-policy"
          className="underline text-blue-400 hover:text-blue-300"
        >
          Polityce Prywatności
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAcceptEssential}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Akceptuj tylko niezbędne
        </button>
        <button
          onClick={handleAcceptAll}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Akceptuj wszystkie
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
