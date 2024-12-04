import { MutableRefObject } from "react";
import bcrypt from "bcryptjs";
import { MediaPerson } from "./types";
import { getSeasonDetails } from "./api/tmdbApi";

export const moveMediaList = (
  direction: string,
  ref: MutableRefObject<HTMLUListElement | null>
) => {
  if (ref.current) {
    if (direction === "left") {
      ref.current.scrollLeft -= ref.current.offsetWidth;
    } else {
      ref.current.scrollLeft += ref.current.offsetWidth;
    }
  }
};

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours !== 0 ? `${hours}h` : ""} ${remainingMinutes}m`;
}
export function calculateAge(year: string): number {
  const today = new Date().getFullYear();

  return today - Number(year);
}

export async function saltAndHashPassword(password: string) {
  try {
    // Generowanie soli
    const salt = await bcrypt.genSalt(10); // 10 to liczba rund, im wyższa, tym bezpieczniejsze
    // Haszowanie hasła
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Błąd podczas haszowania hasła: " + error.message);
  }
}

export function removeSpaces(str: string) {
  return str.replace(/\s+/g, "");
}

function compareNames(name1: string, name2: string): boolean {
  // Normalizacja nazw (usuwanie cudzysłowów i konwersja do małych liter)
  const normalize = (name: string) =>
    name.toLowerCase().replace(/['"]/g, "").trim();

  const words1 = new Set(normalize(name1).split(" "));
  const words2 = new Set(normalize(name2).split(" "));

  // Sprawdzenie, czy wszystkie główne komponenty (imię i nazwisko) są wspólne
  const commonWords = [...words1].filter((word) => words2.has(word));

  // Jeśli co najmniej 2 elementy są wspólne, można uznać, że to ta sama osoba
  return commonWords.length >= 2;
}

export function getPersonImagePathFromList(
  personName: string,
  list: MediaPerson[]
) {
  const [person] = list.filter((person: { name: string }) =>
    compareNames(person.name, personName)
  );

  return person?.profile_path ? person.profile_path : false;
}

export async function fetchAllSeasonsData(
  seriesId: number,
  numberOfSeasons: number
) {
  const seasonsPromises = Array.from({ length: numberOfSeasons }, (_, i) =>
    getSeasonDetails(seriesId, i + 1)
  );
  return await Promise.all(seasonsPromises);
}
