import { redirect } from "next/navigation";
import { auth, providerMap } from "../auth";
import LoginForm from "./LoginForm";
import Providers from "./Providers";
import AuthPageContainer from "../components/authPageContainer/AuthPageContainer";
import BreakLine from "../components/ui/breakLine/BreakLine";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <AuthPageContainer>
      <h1 className="text-h1 font-bold  w-full">Zaloguj</h1>
      <LoginForm />
      <div className="mt-4 text-center ">
        <p className="text-sm mb-2">
          Nie masz konta?{" "}
          <a href="/sign-up" className="text-blue-600">
            Dołącz do CineBase
          </a>
        </p>
        <p className="text-sm">
          Zapomniałeś hasła?{" "}
          <a href="/forgot-password" className="text-blue-600">
            Zresetuj hasło
          </a>
        </p>
      </div>

      <div className="flex justify-center items-center gap-5 w-full">
        <BreakLine />
        <div className=" text-center text-white lg:text-gray-400 ">lub</div>
        <BreakLine />
      </div>

      <Providers providersList={providerMap} />
    </AuthPageContainer>
  );
}
