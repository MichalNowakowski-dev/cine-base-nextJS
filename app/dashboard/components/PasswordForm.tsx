"use client";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { changeUserPassword } from "@/app/lib/actions";

const PasswordForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    changeUserPassword,
    null
  );
  const [toggleCurrentPassword, setToggleCurrentPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-[500px]">
      <div>
        <label className="block text-sm">Aktualne hasło *</label>
        <div className="relative">
          <input
            type={toggleCurrentPassword ? "text" : "password"} // Dynamiczny typ
            name="currentPassword"
            defaultValue={state?.fields?.currentPassword as string}
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
        {
          <p className="text-red-600">
            {state?.errors?.currentPassword as string}
          </p>
        }
      </div>
      <div>
        <label className="block text-sm">Nowe hasło *</label>
        <div className="relative">
          <input
            type={toggleNewPassword ? "text" : "password"} // Dynamiczny typ
            name="newPassword"
            defaultValue={state?.fields?.newPassword as string}
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
        {<p className="text-red-600">{state?.errors?.newPassword as string}</p>}
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
          type="submit"
          disabled={isPending}
          className="mt-4 p-2 bg-green-800 hover:bg-green-500 text-black rounded w-[45%]"
        >
          {isPending ? "Zmieniam hasło..." : "Zmień"}
        </button>
        <button
          onClick={() => router.back()}
          type="button"
          className="mt-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded w-[45%]"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
