"use client";
import { useRouter } from "next/navigation";
import Spinner from "../components/ui/spinner/Spinner";
import { setUserNewPassword } from "../lib/actions";
import { useActionState, useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function ResetForm({ token }: { token: string }) {
  const [toggleCurrentPassword, setToggleCurrentPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(
    (state: unknown, data: FormData) => setUserNewPassword(state, data, token),
    null
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [router, state?.redirectTo, state?.success]);

  return (
    <form
      noValidate
      className="space-y-10 md:space-y-6 w-full"
      action={formAction}
    >
      <div>
        <label className="block text-sm">Nowe hasło</label>
        <div className="relative">
          <input
            type={toggleCurrentPassword ? "text" : "password"} // Dynamiczny typ
            name="password"
            defaultValue={state?.fields?.password as string}
            className="mt-1 p-2 pr-10 w-full bg-backgroundDashboardCard text-white rounded"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggleCurrentPassword((prev) => !prev);
            }}
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            {toggleCurrentPassword ? (
              <BsEyeFill size={20} />
            ) : (
              <BsEyeSlashFill size={20} className="text-zinc-200" />
            )}
          </button>
        </div>
        {<p className="text-red-600">{state?.errors?.password as string}</p>}
      </div>
      <div>
        <label className="block text-sm">Powtórz hasło</label>
        <div className="relative">
          <input
            type={toggleNewPassword ? "text" : "password"} // Dynamiczny typ
            name="confirmPassword"
            defaultValue={state?.fields?.confirmPassword as string}
            className="mt-1 p-2 pr-10 w-full bg-backgroundDashboardCard text-white rounded"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggleNewPassword((prev) => !prev);
            }}
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            {toggleNewPassword ? (
              <BsEyeFill size={20} />
            ) : (
              <BsEyeSlashFill size={20} className="text-zinc-200" />
            )}
          </button>
        </div>
        {
          <p className="text-red-600">
            {state?.errors?.confirmPassword as string}
          </p>
        }
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-4 p-2 bg-green-800 hover:bg-green-500 text-black rounded w-[45%]"
      >
        {isPending ? "Zmieniam hasło..." : "Zmień"}
        {isPending && <Spinner size={20} />}
      </button>
    </form>
  );
}
