"use server";
import { PrismaClient } from "@prisma/client";

export async function sendSupportMessage(prevState: unknown, data: FormData) {
  console.log(prevState);

  const prisma = new PrismaClient();

  // Pobranie danych z formularza
  const message = data.get("message");
  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const email = data.get("email");
  const phoneNumber = data.get("phoneNumber");
  const privacyPolicy = data.get("privacyPolicy");

  // Sprawdzenie, czy wszystkie dane są prawidłowe
  if (
    typeof message !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof privacyPolicy !== "string"
  ) {
    return "Wszystkie pola są wymagane.";
  }

  // Wartość numeru telefonu jest opcjonalna, więc może być null
  const phone = phoneNumber ? String(phoneNumber) : null;

  // Tworzenie nowej wiadomości
  try {
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phone,
        acceptPolicy: privacyPolicy === "on", // Zmienna dla checkboxa, sprawdzamy, czy zaznaczone
      },
    });
    console.log(newMessage);
  } catch (error) {
    return `Błąd podczas tworzenia wiadomości: ${error}`;
  }
}
