"use client";
import Spinner from "../components/ui/spinner/Spinner";
import { resetPassword } from "../lib/actions/auth/authActions";
import { useActionState, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FormStyles } from "../styles";
import Message from "../components/ui/message/Message";

export default function ResetForm({ token }: { token: string }) {
  const [toggleCurrentPassword, setToggleCurrentPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(
    (state: unknown, data: FormData) => resetPassword(state, data, token),
    null
  );

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
            className={FormStyles.inputText}
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
        <div className="relative mb-5">
          <input
            type={toggleNewPassword ? "text" : "password"} // Dynamiczny typ
            name="confirmPassword"
            defaultValue={state?.fields?.confirmPassword as string}
            className={FormStyles.inputText}
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
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        {state?.success && state?.message && (
          <Message success>{state.message}</Message>
        )}
        {!state?.success && state?.message && (
          <Message success={state?.success}>{state?.message}</Message>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={FormStyles.submitButton}
      >
        {isPending ? "Zmieniam hasło..." : "Zmień"}
        {isPending && <Spinner size={20} />}
      </button>
    </form>
  );
}
