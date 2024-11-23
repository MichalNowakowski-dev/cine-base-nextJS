"use server";
import { PrismaClient } from "@prisma/client";

export async function sendSupportMessage(_prevState: unknown, data: FormData) {
  const prisma = new PrismaClient();

  // Pobranie danych z formularza
  const message = data.get("message");
  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const subject = data.get("subject");
  const email = data.get("email");
  const phoneNumber = data.get("phoneNumber");
  const privacyPolicy = data.get("privacyPolicy");

  // Sprawdzenie, czy wszystkie dane są prawidłowe
  if (
    typeof message !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof privacyPolicy !== "string"
  ) {
    return {
      success: false,
      message: "Wszystkie pola z gwiazdką są wymagane.",
    };
  }

  // Wartość numeru telefonu jest opcjonalna, więc może być null
  const phone = phoneNumber ? String(phoneNumber) : null;

  // Tworzenie nowej wiadomości
  try {
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        firstName,
        lastName,
        email,
        subject,
        phoneNumber: phone,
        acceptPolicy: privacyPolicy === "on", // Zmienna dla checkboxa, sprawdzamy, czy zaznaczone
      },
    });
    console.log(newMessage);
    return { success: true, message: "Dziękujemy za wysłanie wiadomości" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Wystąpił bład podczas wysyłania wiadomości",
    };
  }
}
