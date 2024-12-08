import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import { getVerificationTokenByToken } from "@/app/lib/api/userApi";
import { prisma } from "@/app/prisma";
import VerifyEmailSuccess from "./VerifyEmail";

// Funkcja pomocnicza do weryfikacji tokena
async function verifyToken(token: string) {
  const tokenEntry = await getVerificationTokenByToken(token);

  if (!tokenEntry || new Date() > tokenEntry.expires) {
    throw new Error("Nieprawidłowy lub wygasły token.");
  }

  // Zaktualizuj użytkownika, ustawiając `emailVerified` na true
  await prisma.user.update({
    where: { email: tokenEntry.email },
    data: { emailVerified: true },
  });

  // Usuń token po użyciu
  await prisma.verificationToken.delete({
    where: { token },
  });

  return "Adres e-mail został pomyślnie potwierdzony!";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  let message: string;

  try {
    const { token } = await searchParams;

    if (!token) {
      throw new Error("Token nie został dostarczony.");
    }

    message = await verifyToken(token);
  } catch (error) {
    message = (error as Error).message;
  }

  return (
    <PageContainer>
      <VerifyEmailSuccess message={message} />
    </PageContainer>
  );
}
