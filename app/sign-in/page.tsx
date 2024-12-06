import { redirect } from "next/navigation";
import { auth, providerMap } from "../auth";
import LoginForm from "./LoginForm";
import Providers from "./Providers";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <div className="lg:min-h-screen mx-auto pt-20 lg:pt-28 lg:px-4 max-w-screen-xl">
      <div className="flex flex-col lg:flex-row items-center lg:h-[800px] bg-white text-white w-full">
        <div className="hidden lg:block basis-1/2 lg:bg-signupBg bg-no-repeat bg-center bg-cover h-full px-20 pt-10 ">
          <h1 className="text-h1 mb-10">
            Odkryj tysiące tytułów na wyciągnięcie ręki.
          </h1>
          <p className="text-lg ">
            Zaloguj się, aby stworzyć swoją osobistą listę ulubionych produkcji,
            otrzymywać rekomendacje i nigdy nie przegapić hitów na ekranie.
          </p>
        </div>
        <div className="flex flex-col bg-signupBg bg-center bg-cover bg-no-repeat lg:bg-backgroundLight lg:bg-none items-center justify-center gap-10 px-4 lg:px-20 lg:basis-1/2 lg:h-full h-screen-minus-nav w-full sm:px-40">
          <h1 className="text-h1 font-bold  w-full">Zaloguj</h1>

          <LoginForm />

          <div className="mt-4 text-center">
            <p className="text-sm">
              Nie masz konta?{" "}
              <a href="/sign-up" className="text-blue-600">
                Dołącz do CineBase
              </a>
            </p>
          </div>

          <div className="flex justify-center items-center gap-5 w-full">
            <div className="bg-white lg:bg-secondary w-full  h-[2px]"></div>
            <div className=" text-center text-white lg:text-gray-400 ">lub</div>
            <div className="bg-white lg:bg-secondary w-full  h-[2px]"></div>
          </div>

          <Providers providersList={providerMap} />
        </div>
      </div>
    </div>
  );
}
