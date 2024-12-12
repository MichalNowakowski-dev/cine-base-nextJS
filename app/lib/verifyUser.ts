import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

async function verifyUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user?.passwordHash) {
      return null;
    }

    // Porównaj zahaszowane hasło z wprowadzonym przez użytkownika
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
}

export default verifyUser;
