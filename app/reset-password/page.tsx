import React from "react";
import ResetForm from "./ResetForm";
import AuthPageContainer from "../components/authPageContainer/AuthPageContainer";
import Message from "../components/ui/message/Message";
import Link from "next/link";
import { verifyToken } from "../lib/actions/auth/authActions";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  try {
    await verifyToken(token);
  } catch (error) {
    console.error(error);
    return (
      <AuthPageContainer>
        <Message success={false}>Nieaktywny lub nieistniejący token. </Message>
        <Link className="text-blue-300" href={"/forgot-password"}>
          Zresetuj hasło ponownie
        </Link>
      </AuthPageContainer>
    );
  }

  return (
    <AuthPageContainer>
      <h1 className="text-h1 font-bold w-full">Reset hasła</h1>
      <ResetForm token={token} />
    </AuthPageContainer>
  );
}
