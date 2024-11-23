"use server";
import { PrismaClient } from "@prisma/client";
import { formSchema } from "../support/formSchema";
import { z } from "zod";

export async function sendSupportMessage(_prevState: unknown, data: FormData) {
  const prisma = new PrismaClient();

  // Pobranie danych z formularza
  const formData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    subject: data.get("subject"),
    phoneNumber: data.get("phoneNumber")?.toString().trim() || undefined,
    message: data.get("message"),
    privacyPolicy: data.get("privacyPolicy") === "on", // Konwersja na boolean
  };

  // Tworzenie nowej wiadomości
  try {
    const validatedData = formSchema.parse(formData);
    const newMessage = await prisma.message.create({
      data: {
        content: validatedData.message,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        subject: formData.subject as string,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber || null,
        acceptPolicy: validatedData.privacyPolicy,
      },
    });
    console.log("Wiadomość zapisana:", newMessage);
    return { success: true, message: "Dziękujemy za wysłanie wiadomości" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Mapowanie błędów Zod na klucze pól
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return { success: false, errors: fieldErrors };
    }
    console.error("Błąd podczas wysyłania wiadomości:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
}
