"use server";
import { messageSchema } from "./schemas/messageSchema";
import nameSchema from "./schemas/nameSchema";
import { z } from "zod";
import registerSchema from "./schemas/registerSchema";
import { comparePassword, saltAndHashPassword } from "./utils";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { MediaItem, MediaType } from "../types/types";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/prisma";
import {
  ensureMediaExists,
  getPasswordResetTokenByToken,
  getUserByEmail,
} from "./api/userApi";
import passwordSchema from "./schemas/passwordSchema";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "./api/tokens";
import { sendResetPasswordEmail, sendVerificationEmail } from "./mail";
import resetPasswordEmailSchema from "./schemas/resetPasswordEmailSchema";
import { resetPasswordSchema } from "./schemas/resetPasswordPasswordSchema";

export async function changeUserName(_prevState: unknown, data: FormData) {
  const session = await auth();

  const formData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
  };
  let isError = false;

  try {
    const validatedData = nameSchema.parse(formData);
    const newName = await prisma.user.update({
      where: {
        id: Number(session?.user.id),
      },
      data: {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      },
    });
    console.log("Nowa nazwa:", newName);

    return { success: true, message: "Nazwa zmieniona" };
  } catch (error) {
    isError = true;
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return { success: false, errors: fieldErrors, fields: formData };
    }
    console.error("Błąd podczas zmieny nazwy:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  } finally {
    if (!isError) {
      redirect("/dashboard/profile");
    }
  }
}
export async function changeUserPassword(_prevState: unknown, data: FormData) {
  const session = await auth();

  const formData = {
    currentPassword: data.get("currentPassword"),
    newPassword: data.get("newPassword"),
  };

  if (!formData.currentPassword || !formData.newPassword) {
    return { success: false, message: "Musisz uzupełnić oba pola." };
  }

  try {
    const userPassword = await prisma.user.findUnique({
      where: { id: Number(session?.user.id) },
      select: { passwordHash: true },
    });

    if (!userPassword?.passwordHash) {
      const validatedData = passwordSchema.parse(formData.newPassword);

      const hashedPassword = await saltAndHashPassword(validatedData);

      await prisma.user.update({
        where: { id: Number(session?.user.id) },
        data: { passwordHash: hashedPassword },
      });

      return { success: true, message: "Hasło zostało ustawione pomyślnie." };
    }

    const isMatch = await comparePassword(
      formData.currentPassword as string,
      userPassword.passwordHash
    );

    if (!isMatch) {
      return { success: false, message: "Obecne hasło jest niepoprawne." };
    }

    const validatedData = passwordSchema.parse(formData.newPassword);

    const hashedPassword = await saltAndHashPassword(validatedData);

    await prisma.user.update({
      where: { id: Number(session?.user.id) },
      data: { passwordHash: hashedPassword },
    });

    return { success: true, message: "Hasło zmienione pomyślnie." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const err of error.errors) {
        fieldErrors["newPassword"] = err.message;
      }

      return { success: false, errors: fieldErrors, fields: formData };
    }

    console.error("Błąd podczas zmiany hasła:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
}

export async function sendSupportMessage(_prevState: unknown, data: FormData) {
  const formData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    subject: data.get("subject"),
    phoneNumber: data.get("phoneNumber")?.toString().trim() || undefined,
    message: data.get("message"),
    privacyPolicy: data.get("privacyPolicy") === "on",
  };

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
export async function sendResetEmail(_prevState: unknown, data: FormData) {
  const email = data.get("email");

  try {
    const validatedData = resetPasswordEmailSchema.parse({ email });
    console.log(validatedData);

    const userExists = await getUserByEmail(validatedData.email);

    if (userExists) {
      const passwordResetToken = await generatePasswordResetToken(
        validatedData.email
      );

      await sendResetPasswordEmail(
        passwordResetToken.email,
        passwordResetToken.token
      );
    }

    return {
      success: true,
      message:
        "Jeśli istnieje konto powiązane z tym adresem e-mail, wysłaliśmy wiadomość z linkiem do resetu hasła.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const emailError = error.errors.find(
        (err) => err.path[0] === "email"
      )?.message;

      return {
        success: false,
        errors: { email: emailError || "Nieznany błąd" },
        fields: { email },
      };
    }

    console.error("Błąd podczas wysyłania e-maila:", error);

    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
}
export async function setUserNewPassword(
  _prevState: unknown,
  data: FormData,
  token: string
) {
  const formData = {
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };

  try {
    const validatedData = resetPasswordSchema.parse(formData);

    const resetPasswordToken = await getPasswordResetTokenByToken(token);

    const hashedPassword = await saltAndHashPassword(
      validatedData.confirmPassword
    );

    await prisma.user.update({
      where: {
        email: resetPasswordToken?.email,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        token,
      },
    });

    console.log("Zmiana hasła pomyślna:");
    return {
      success: true,
      message: "Zmieniono hasło",
      redirectTo: "/sign-in",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return { success: false, errors: fieldErrors, fields: formData };
    }
    console.error("Błąd podczas rejestracji:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
}

export async function registerUser(_prevState: unknown, data: FormData) {
  const registerFormData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };

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

    const verificationToken = await generateVerificationToken(
      validatedData.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    console.log("uzytkownik zarejestrowany pomyslnie");

    return { success: true, message: "Potwierdzający e-mail został wysłany!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
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
}

export async function loginUser(_prevState: unknown, formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  let errorOccurred = false;

  const existingUser = await getUserByEmail(formObject.email as string);
  if (existingUser) {
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email as string
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return {
        success: true,
        message: "Email weryfikacyjny wysłany ponownie.",
      };
    }
  }

  try {
    await signIn("credentials", formObject);
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;
      if (error.message.includes("Invalid credentials")) {
        return {
          success: false,
          message: "Błędne dane logowania.",
          fields: formObject,
        };
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

export const removeItemFromUserList = async (
  id: number,
  userId: number,
  mediaType: MediaType,
  listType: "favorites" | "toWatch" | "ratings"
) => {
  if (!userId) {
    throw new Error("user not logged in");
  }
  try {
    if (listType === "favorites") {
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
    } else if (listType === "ratings") {
      if (mediaType === "movie") {
        await prisma.movieRating.deleteMany({
          where: {
            userId: Number(userId),
            movieId: Number(id),
          },
        });
      }

      await prisma.showRating.deleteMany({
        where: {
          userId: Number(userId),
          showId: Number(id),
        },
      });
    } else {
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
    }
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
