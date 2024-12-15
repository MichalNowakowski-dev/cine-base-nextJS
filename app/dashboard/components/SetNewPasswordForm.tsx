"use client";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { setUserPassword } from "@/app/lib/actions/user/userActions";
import Spinner from "@/app/components/ui/spinner/Spinner";

const SetNewPasswordForm = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(setUserPassword, null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-[500px]">
      <div>
        <label className="block text-sm">Obecne haslo*</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"} // Dynamiczny typ
            name="password"
            defaultValue={state?.fields?.password as string}
            className="mt-1 p-2 pr-10 w-full bg-backgroundDashboardCard text-white rounded"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPasswordVisible((prev) => !prev);
            }}
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <BsEyeSlashFill size={20} className="text-zinc-200" />
            ) : (
              <BsEyeFill size={20} />
            )}
          </button>
        </div>
        {<p className="text-red-600">{state?.errors?.password as string}</p>}
      </div>
      <div>
        <label className="block text-sm">Powtórz hasło*</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"} // Dynamiczny typ
            name="confirmPassword"
            defaultValue={state?.fields?.confirmPassword as string}
            className="mt-1 p-2 pr-10 w-full bg-backgroundDashboardCard text-white rounded"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPasswordVisible((prev) => !prev);
            }}
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <BsEyeSlashFill size={20} className="text-zinc-200" />
            ) : (
              <BsEyeFill size={20} />
            )}
          </button>
        </div>
        {
          <p className="text-red-600">
            {state?.errors?.confirmPassword as string}
          </p>
        }
      </div>
      {state?.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
      <div className="w-full flex justify-between">
        <button
          disabled={isPending}
          className={`mt-4 px-6 py-2 rounded bg-blue-600 text-white font-medium flex items-center gap-3 w-[45%] justify-center ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isPending ? "Zapisywanie..." : "Zatwierdź"}
          {isPending && <Spinner size={20} />}
        </button>
        <button
          onClick={() => router.back()}
          type="button"
          className="mt-4 p-2 bg-zinc-400 hover:bg-zinc-500 text-white rounded w-[45%]"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default SetNewPasswordForm;
