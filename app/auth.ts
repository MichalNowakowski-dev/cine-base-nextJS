import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/prisma";
import verifyUser from "./lib/verifyUser";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./lib/api/userApi";

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
        throw new AuthError("Empty fields");
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
    async jwt({ token, user, trigger, session }) {
      // Dodajemy `id` użytkownika do tokena JWT, jeśli istnieje
      if (user) {
        token.id = user.id;
        token.image = user.image || null;
      }
      if (trigger === "update" && session) {
        token.image = session.user.image; // Przykład: nowy obraz awatara
      }
      return token;
    },
    async session({ session, token }) {
      // Dodajemy ID z tokena JWT do sesji
      session.user.id = String(token.id);
      session.user.image = token.image as string;

      // Pobieramy dane użytkownika, w tym subskrypcje
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email },
        include: {
          subscriptions: {
            where: { status: "active" }, // Wybieramy tylko aktywne subskrypcje
            orderBy: {
              subscriptionEnd: "desc", // Najnowsza subskrypcja
            },
            take: 1, // Bierzemy tylko jedną subskrypcję
            select: {
              planId: true,
              subscriptionStart: true,
              subscriptionEnd: true,
              status: true,
              plan: {
                select: {
                  name: true,
                  monthlyPrice: true,
                  yearlyPrice: true,
                },
              },
            },
          },
        },
      });

      if (user && user.subscriptions.length > 0) {
        const activeSubscription = user.subscriptions[0]; // Bierzemy aktywną subskrypcję
        session.user.planId = activeSubscription.planId;
        session.user.subscriptionStart = activeSubscription.subscriptionStart;
        session.user.subscriptionEnd = activeSubscription.subscriptionEnd;
        session.user.subscriptionStatus = activeSubscription.status;
        session.user.plan = activeSubscription.plan; // Plan subskrypcji
      }

      return session;
    },
    async signIn({ user, account }) {
      // if (account?.provider !== "credentials") return true;

      const existingUser = await getUserByEmail(user.email as string);
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified && account?.provider === "credentials")
        return false;

      // Sprawdzamy, czy użytkownik loguje się przez Google
      if (account?.provider === "google") {
        if (!existingUser) {
          // Tworzymy nowego użytkownika, jeśli nie istnieje
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              // Inne dane użytkownika
            },
          });
        }

        // Tworzymy powiązanie z Google w tabeli Account, jeśli nie istnieje
        const existingAccount = await prisma.account.findFirst({
          where: {
            provider: "google",
            providerAccountId: account.providerAccountId,
          },
        });

        if (!existingAccount) {
          // Tworzymy nowe konto powiązane z Google
          await prisma.account.create({
            data: {
              userId: existingUser ? existingUser.id : Number(user.id),
              type: "user",
              provider: "google",
              providerAccountId: account.providerAccountId,
              // Przechowywanie innych informacji o dostawcy
            },
          });
        }
      }
      return true;
    },
  },
});
