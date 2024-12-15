"use server";
import { z } from "zod";
import { getUserByEmail } from "../user/userActions";
import resetPasswordEmailSchema from "../../schemas/resetPasswordEmailSchema";
import { resetPasswordSchema } from "../../schemas/resetPasswordPasswordSchema";
import { saltAndHashPassword } from "../../utils";
import { prisma } from "@/app/prisma";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/email/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@cinebase.pl",
    to: email,
    subject: "Potwierdź swój adres e-mail - CineBase",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h1 style="text-align: center; color: #4CAF50;">Witamy w CineBase!</h1>
        <p>Szanowny Użytkowniku,</p>
        <p>Dziękujemy za rejestrację w CineBase. Aby dokończyć proces rejestracji i aktywować swoje konto, prosimy o potwierdzenie adresu e-mail.</p>
        <p>Kliknij poniższy przycisk, aby potwierdzić swój adres e-mail:</p>
        <p style="text-align: center;">
          <a href="${confirmLink}" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Potwierdź e-mail</a>
        </p>
        <p>Jeśli powyższy przycisk nie działa, skopiuj i wklej poniższy link w przeglądarce:</p>
        <p><a href="${confirmLink}" style="color: #4CAF50;">${confirmLink}</a></p>
        <p>Jeśli nie rejestrowałeś/aś się w CineBase, prosimy o zignorowanie tej wiadomości.</p>
        <p>Z poważaniem,<br>Zespół CineBase</p>
      </div>
    `,
  });
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@cinebase.pl",
    to: email,
    subject: "Zresetuj swoje hasło - CineBase",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h1 style="text-align: center; color: #4CAF50;">Reset hasła w CineBase</h1>
        <p>Szanowny Użytkowniku,</p>
        <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w CineBase. Jeśli to Ty wysłałeś/aś tę prośbę, kliknij poniższy przycisk, aby ustawić nowe hasło:</p>
        <p style="text-align: center;">
          <a href="${confirmLink}" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Zresetuj hasło</a>
        </p>
        <p>Jeśli powyższy przycisk nie działa, skopiuj i wklej poniższy link w przeglądarce:</p>
        <p><a href="${confirmLink}" style="color: #4CAF50;">${confirmLink}</a></p>
        <p>Jeśli to nie Ty wysyłałeś/aś prośbę o zmianę hasła, zignoruj tę wiadomość. Twoje hasło pozostanie bez zmian.</p>
        <p>Z poważaniem,<br>Zespół CineBase</p>
      </div>
    `,
  });
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export async function verifyToken(token: string) {
  const tokenEntry = await getPasswordResetTokenByToken(token);

  if (!tokenEntry || new Date() > tokenEntry.expires) {
    throw new Error("Nieprawidłowy lub wygasły token");
  }

  return tokenEntry;
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

export async function resetPassword(
  _prevState: unknown,
  data: FormData,
  token: string
) {
  const formData = {
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };

  try {
    await verifyToken(token);

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

    console.log("Hasło zostało zresetowane:");
    return {
      success: true,
      message: "Hasło zostało zresetowane",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return { success: false, errors: fieldErrors, fields: formData };
    }
    if (error === "Nieprawidłowy lub wygasły token") {
      return {
        success: false,
        message: error,
      };
    }
    console.error("Błąd podczas rejestracji:", error);
    return {
      success: false,
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    };
  }
}
