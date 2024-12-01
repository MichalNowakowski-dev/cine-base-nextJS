import { redirect } from "next/navigation";
import { auth } from "../auth";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import RegistrationForm from "./RegistrationForm";

const Register = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <PageContainer>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Zarejestruj się
        </h2>
        <RegistrationForm />
        <div className="mt-4 text-center">
          <p className="text-sm">
            Masz już konto?{" "}
            <a href="/sign-in" className="text-blue-600">
              Zaloguj się
            </a>
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Register;
