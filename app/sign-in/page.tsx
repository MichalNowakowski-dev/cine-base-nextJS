import { redirect } from "next/navigation";
import Image from "next/image";
import { signIn, providerMap } from "@/app/auth";
import { AuthError } from "next-auth";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import LoginForm from "./LoginForm";

// import { loginUser } from "../lib/actions";

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined; error?: string }>;
}) {
  const { callbackUrl, error } = await props.searchParams;
  const SIGNIN_ERROR_URL = "/sign-in";

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          {/* Credentials Form */}
          <LoginForm error={error as string} />

          <div className="my-6 text-center text-gray-400">Lub</div>

          {/* OAuth Providers */}
          <div className="space-y-3">
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
                  className="w-full flex items-center justify-center py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition duration-300"
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
    </PageContainer>
  );
}
