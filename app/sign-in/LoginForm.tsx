"use client";
import Spinner from "../components/ui/spinner/Spinner";
import { loginUser } from "../lib/actions/user/userActions";
import { useActionState, useState } from "react";
import Message from "../components/ui/message/Message";
import { FormStyles } from "../styles";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form
      noValidate
      className="space-y-4 md:space-y-8 w-full"
      action={formAction}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            autoComplete="email"
            defaultValue={state?.fields?.email as string}
            type="text"
            name="email"
            id="email"
            className={FormStyles.inputText}
            placeholder="Wpisz swój adres email"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm mb-1">
            Hasło
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              defaultValue={state?.fields?.password as string}
              className={FormStyles.inputText}
              placeholder="Wpisz swoje hasło"
              id="password"
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
        </div>
      </div>
      {state?.success && state?.message && (
        <Message success>{state.message}</Message>
      )}
      {!state?.success && state?.message && (
        <Message success={false}>{state?.message}</Message>
      )}
      <button
        type="submit"
        disabled={isPending}
        className={FormStyles.submitButton}
      >
        {isPending ? "Logowanie..." : "Zaloguj"}
        {isPending && <Spinner size={20} />}
      </button>
    </form>
  );
}
