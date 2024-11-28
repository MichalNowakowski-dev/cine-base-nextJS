"use server";
import { PrismaClient } from "@prisma/client";
import { formSchema } from "./schemas/formSchema";
import { z } from "zod";
import registerSchema from "./schemas/registerSchema";
import { saltAndHashPassword } from "./utils";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";

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

      return { success: false, errors: fieldErrors, fields: formData };
    }
    console.error("Błąd podczas wysyłania wiadomości:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
}

export async function addUserToDb(_prevState: unknown, data: FormData) {
  const prisma = new PrismaClient();

  // Pobranie danych z formularza
  const registerFormData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };

  // Tworzenie nowej wiadomości

  try {
    const validatedData = registerSchema.parse(registerFormData);
    const hashedPassword = await saltAndHashPassword(validatedData.password);
    await prisma.user.create({
      data: {
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        passwordHash: hashedPassword,
      },
    });
    console.log("uzytkownik zarejestrowany pomyslnie");
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Mapowanie błędów Zod na klucze pól
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return { success: false, errors: fieldErrors, fields: registerFormData };
    }
    console.error("Błąd podczas rejestracji:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
  redirect("/sign-in");
}

export async function loginUser(formData: FormData) {
  "use server";
  const formObject = Object.fromEntries(formData.entries());
  try {
    await signIn("credentials", {
      ...formObject,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/sign-in?error=${error.type}`);
    }
    throw error;
  }
}
