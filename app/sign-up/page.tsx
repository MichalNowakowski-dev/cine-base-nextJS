import { redirect } from "next/navigation";
import { auth } from "../auth";
import RegistrationForm from "./RegistrationForm";
import AuthPageContainer from "../components/authPageContainer/AuthPageContainer";

const Register = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <AuthPageContainer>
      <h1 className="text-h1 font-bold  w-full">Zarejestruj się</h1>
      <RegistrationForm />
      <div className="mt-4 text-center">
        <p className="text-sm">
          Masz już konto?{" "}
          <a href="/sign-in" className="text-blue-600">
            Zaloguj się
          </a>
        </p>
      </div>
    </AuthPageContainer>
  );
};

export default Register;
