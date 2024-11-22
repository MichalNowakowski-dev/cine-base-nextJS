"use server";
import { PrismaClient } from "@prisma/client";

export async function sendSupportMessage(prevState: unknown, data: FormData) {
  const prisma = new PrismaClient();
  // Tu możesz dodać logikę np. wysłania do bazy danych lub innego API
  const formData = Object.fromEntries(data);

  try {
    const newMessage = await prisma.message.create({
      data: {
        content: formData.message,
      },
    });
    console.log(newMessage);
  } catch (error) {
    return "Error occured when creating message";
  }
}
export async function createUser(prevState: unknown, data: FormData) {
  const prisma = new PrismaClient();
  // Tu możesz dodać logikę np. wysłania do bazy danych lub innego API
  const formData = Object.fromEntries(data);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: formData.email,
        name: formData.firstName,
      },
    });
    console.log(newUser);
  } catch (error) {
    return "Error occured when creating user in DB";
  }
}
