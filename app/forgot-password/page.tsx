import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import AuthPageContainer from "../components/authPageContainer/AuthPageContainer";

export default function page() {
  return (
    <AuthPageContainer>
      <h1 className="text-lg md:text-h2 font-bold w-full">
        Wyślij e-mail z linkiem resetującym hasło.
      </h1>

      <ForgotPasswordForm />
    </AuthPageContainer>
  );
}
