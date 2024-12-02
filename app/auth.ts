import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/prisma";
import verifyUser from "./lib/verifyUser";
import Credentials from "next-auth/providers/credentials";

// Define the User interface using optional chaining for avatarUrl

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    async authorize(credentials): Promise<any> {
      const { email, password } = credentials;

      if (!email || !password) {
        return null;
      }

      const user = await verifyUser(email as string, password as string);

      if (!user) {
        throw new AuthError("Invalid credentials");
      }

      return user;
    },
  }),
  Google,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Dodajemy `id` użytkownika do tokena JWT, jeśli istnieje
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Dodajemy ID z tokena JWT do sesji
      if (token.id) {
        session.user.id = String(token.id);
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user?.email },
        select: {
          planId: true,
          subscriptionStart: true,
          subscriptionEnd: true,
        },
      });

      if (user) {
        session.user.planId = user.planId;
        session.user.subscriptionStart = user.subscriptionStart;
        session.user.subscriptionEnd = user.subscriptionEnd;
      }
      return session;
    },
  },
});
