"use client";
import Spinner from "../components/ui/spinner/Spinner";
import { loginUser } from "../lib/actions/user/userActions";
import { useActionState } from "react";
import Message from "../components/ui/message/Message";
import { FormStyles } from "../styles";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

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
          <input
            autoComplete="password"
            type="password"
            defaultValue={state?.fields?.password as string}
            name="password"
            id="password"
            className={FormStyles.inputText}
            placeholder="Wpisz swoje hasło"
          />
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
