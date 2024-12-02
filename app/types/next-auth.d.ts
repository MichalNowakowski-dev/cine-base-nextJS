// types/next-auth.d.ts
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Dodajemy pole ID
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Dodajemy pole ID do User
    planId?: string | null; // Plan subskrypcji
    subscriptionStart?: Date | null; // Data rozpoczęcia
    subscriptionEnd?: Date | null; // Data zakończenia
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Dodajemy pole ID do JWT
  }
}
