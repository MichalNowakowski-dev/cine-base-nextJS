import { redirect } from "next/navigation";
import Image from "next/image";
import { signIn, providerMap } from "@/app/auth";
import { AuthError } from "next-auth";
import LoginForm from "./LoginForm";

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined; error?: string }>;
}) {
  const { callbackUrl, error } = await props.searchParams;
  const SIGNIN_ERROR_URL = "/sign-in";

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

          <LoginForm error={error as string} />

          <div className="flex justify-center items-center gap-5 w-full">
            <div className="bg-white lg:bg-secondary w-full  h-[2px]"></div>
            <div className=" text-center text-white lg:text-gray-400 ">lub</div>
            <div className="bg-white lg:bg-secondary w-full  h-[2px]"></div>
          </div>

          <div className="space-y-3 w-full ">
            {Object.values(providerMap).map((provider) => (
              <form
                key={provider.id}
                action={async () => {
                  "use server";
                  try {
                    await signIn(provider.id, {
                      redirectTo: callbackUrl ?? "",
                    });
                  } catch (error) {
                    if (error instanceof AuthError) {
                      return redirect(
                        `${SIGNIN_ERROR_URL}?error=${error.type}`
                      );
                    }
                    throw error;
                  }
                }}
              >
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-2 bg-black/70 md:bg-gray-700 hover:bg-gray-600 border border-secondary text-white rounded-full shadow-md transition duration-300"
                >
                  <Image
                    src={`/icons/${provider.id}.svg`}
                    alt={`${provider.name} icon`}
                    className="w-5 h-5 mr-3"
                    width={48}
                    height={48}
                  />
                  <span>Zaloguj przez {provider.name}</span>
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
