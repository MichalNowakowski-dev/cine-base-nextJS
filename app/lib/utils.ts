import { MutableRefObject } from "react";
import bcrypt from "bcryptjs";

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

module.exports = saltAndHashPassword;
