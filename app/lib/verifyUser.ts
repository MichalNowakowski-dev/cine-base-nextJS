import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyUser(email: string, password: string) {
  try {
    // Szukamy użytkownika w bazie danych po emailu
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Jeśli użytkownik nie istnieje, zwróć false
    if (!user) {
      return null;
    }

    // Porównaj zahaszowane hasło z wprowadzonym przez użytkownika
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null; // Hasło jest nieprawidłowe
    }

    // Jeśli email i hasło są poprawne, zwróć użytkownika
    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
}

export default verifyUser;
