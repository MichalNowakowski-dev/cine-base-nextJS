"use server";
import { auth, signIn } from "@/app/auth";
import nameSchema from "../../schemas/nameSchema";
import { prisma } from "@/app/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { resetPasswordSchema } from "../../schemas/resetPasswordPasswordSchema";
import { comparePassword, saltAndHashPassword } from "../../utils";
import passwordSchema from "../../schemas/passwordSchema";
import registerSchema from "../../schemas/registerSchema";
import { generateVerificationToken } from "../auth/authActions";
import { sendVerificationEmail } from "../auth/authActions";
import { AuthError } from "next-auth";
import Stripe from "stripe";

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
export async function setUserPassword(_prevState: unknown, data: FormData) {
  const session = await auth();

  const formData = {
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };

  if (!formData.password || !formData.confirmPassword) {
    return { success: false, message: "Musisz uzupełnić oba pola." };
  }

  try {
    const validatedData = resetPasswordSchema.parse(formData);

    const hashedPassword = await saltAndHashPassword(
      validatedData.confirmPassword
    );

    await prisma.user.update({
      where: { id: Number(session?.user.id) },
      data: { passwordHash: hashedPassword },
    });

    return { success: true, message: "Hasło zostało ustawione pomyślnie." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const err of error.errors) {
        fieldErrors["confirmPassword"] = err.message;
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
    if (!userPassword?.passwordHash)
      return { success: false, message: "Brak obecnego hasła w bazie." };

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
export async function registerUser(_prevState: unknown, data: FormData) {
  const registerFormData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: registerFormData.email as string },
    });

    if (existingUser)
      return {
        success: false,
        message: "Konto o podanym adresie e-mail już istnieje",
      };

    const validatedData = registerSchema.parse(registerFormData);
    const hashedPassword = await saltAndHashPassword(validatedData.password);
    await prisma.user.create({
      data: {
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        name: validatedData.firstName + " " + validatedData.lastName,
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
export async function cancelSubscription(stripeSubscriptionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  try {
    await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    return { message: "Success" };
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
}

export async function saveAvatar(avatarPath: string) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return "User unauthorized";
  }
  try {
    await prisma.user.update({
      where: {
        email: user?.email as string,
      },
      data: {
        image: avatarPath,
      },
    });
    return { message: "Avatar successfully saved in database" };
  } catch (error) {
    console.error(error);

    return { message: "Error occured while saving avatar in database" };
  }
}

export async function getUserName(userId: number) {
  try {
    const username = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });
    if (!username?.name) return "Błąd pobierania nazwy użytkownika";
    return username.name;
  } catch (error) {
    console.error(error);
    return "Błąd pobierania nazwy użytkownika";
  }
}
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export const getUserPassword = async (userId: number) => {
  const userPassword = await prisma.user.findUnique({ where: { id: userId } });
  return userPassword?.passwordHash;
};

export const getUserSubscriptionHistory = async (userId: number) => {
  const userSubscription = await prisma.subscription.findMany({
    where: { userId, status: "canceled" },
    include: {
      plan: {
        select: {
          name: true,
          monthlyPrice: true,
          yearlyPrice: true,
        },
      },
    },
  });

  return userSubscription;
};
export const getUserSubscriptionInfo = async (userId: number) => {
  const userSubscription = await prisma.subscription.findFirst({
    where: { userId, status: "active" },
    include: {
      plan: {
        select: {
          name: true,
          monthlyPrice: true,
          yearlyPrice: true,
        },
      },
    },
  });

  return userSubscription;
};
