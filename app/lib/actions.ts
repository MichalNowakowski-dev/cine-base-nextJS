"use server";
import { PrismaClient } from "@prisma/client";
import { messageSchema } from "./schemas/messageSchema";
import { z } from "zod";
import registerSchema from "./schemas/registerSchema";
import { saltAndHashPassword } from "./utils";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { MediaItem, MediaType } from "../types/types";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { ensureMediaExists } from "./api/userApi";

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
    const validatedData = messageSchema.parse(formData);
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

export async function loginUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prevState: any,
  formData: FormData
) {
  const formObject = Object.fromEntries(formData.entries());
  let errorOccurred = false;
  try {
    await signIn("credentials", formObject);
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;
      if (error.message.includes("Invalid credentials")) {
        return { success: false, message: "Błędne dane logowania." };
      } else if (error.message.includes("Empty fields")) {
        return {
          success: false,
          message: "Pola email oraz hasło nie mogą być puste",
        };
      } else {
        return { success: false, message: "Coś poszło nie tak." };
      }
    }
  } finally {
    if (!errorOccurred) {
      redirect("/dashboard");
    }
  }
}

export const removeFavorite = async (
  id: number,
  userId: number,
  mediaType: MediaType
) => {
  if (!userId) {
    throw new Error("user not logged in");
  }
  try {
    if (mediaType === "movie") {
      await prisma.favoriteMovie.deleteMany({
        where: {
          userId: Number(userId),
          movieId: Number(id),
        },
      });
    }

    await prisma.favoriteShow.deleteMany({
      where: {
        userId: Number(userId),
        showId: Number(id),
      },
    });
    revalidatePath("/dashboard/lists");
  } catch (error) {
    console.error(error);

    throw new Error("Error occured while removing fav media");
  }
};
export const removeToWatch = async (
  id: number,
  userId: number,
  mediaType: MediaType
) => {
  if (!userId) {
    throw new Error("user not logged in");
  }
  try {
    if (mediaType === "movie") {
      await prisma.toWatchMovie.deleteMany({
        where: {
          userId: Number(userId),
          movieId: Number(id),
        },
      });
    }

    await prisma.toWatchShow.deleteMany({
      where: {
        userId: Number(userId),
        showId: Number(id),
      },
    });
    revalidatePath("/dashboard/lists");
  } catch (error) {
    console.error(error);

    throw new Error("Error occured while removing toWatch media");
  }
};
export const addFavorite = async (
  mediaType: MediaType,
  mediaData: MediaItem,
  userId: number
) => {
  if (!userId) {
    throw new Error("user not logged in");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    await ensureMediaExists(mediaData, mediaType);

    const favorite =
      mediaType === "movie"
        ? await prisma.favoriteMovie.create({
            data: {
              userId: userId,
              movieId: mediaData.id,
            },
          })
        : await prisma.favoriteShow.create({
            data: {
              userId: userId,
              showId: mediaData.id,
            },
          });
    console.log("Dodano do ulubionych: ");
    console.log(favorite);
    return favorite;
  } catch (error) {
    console.error("Błąd:", error);
    throw new Error("Error occured while adding media to favorites");
  }
};
export const addToWatch = async (
  mediaType: MediaType,
  mediaData: MediaItem,
  userId: number
) => {
  if (!userId) {
    throw new Error("user not logged in");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    await ensureMediaExists(mediaData, mediaType);

    const toWatch =
      mediaType === "movie"
        ? await prisma.toWatchMovie.create({
            data: {
              userId: userId,
              movieId: mediaData.id,
            },
          })
        : await prisma.toWatchShow.create({
            data: {
              userId: userId,
              showId: mediaData.id,
            },
          });
    console.log("Dodano do obejrzenia: ");
    console.log(toWatch);
    return toWatch;
  } catch (error) {
    console.error("Błąd:", error);
    throw new Error("Error occured while adding media to toWatch");
  }
};
export const setOrUnsetRating = async (
  mediaType: MediaType,
  mediaData: MediaItem,
  userId: number,
  rating: number
) => {
  const validateRating = (rating: number) => {
    if (rating < 0 || rating > 10) {
      throw new Error("Invalid rating value");
    }
  };

  const upsertRating = async (
    userId: number,
    mediaData: MediaItem,
    mediaType: MediaType,
    rating: number
  ) => {
    const isMovie = mediaType === "movie";

    return isMovie
      ? prisma.movieRating.upsert({
          where: {
            userId_movieId: { userId, movieId: mediaData.id },
          },
          update: { rating },
          create: { userId, movieId: mediaData.id, rating },
        })
      : prisma.showRating.upsert({
          where: {
            userId_showId: { userId, showId: mediaData.id },
          },
          update: { rating },
          create: { userId, showId: mediaData.id, rating },
        });
  };

  if (!userId) {
    throw new Error("user not logged in");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    validateRating(rating);
    await ensureMediaExists(mediaData, mediaType);
    const ratingRecord = await upsertRating(
      userId,
      mediaData,
      mediaType,
      rating
    );

    return ratingRecord;
  } catch (error) {
    console.error(error);
    throw new Error("Error occured while setting rating");
  }
};
