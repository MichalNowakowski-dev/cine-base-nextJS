"use client";
import Spinner from "../components/ui/spinner/Spinner";
import { sendResetEmail } from "../lib/actions/auth/authActions";
import { useActionState } from "react";
import Message from "../components/ui/message/Message";
import { FormStyles } from "../styles";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(sendResetEmail, null);

  return (
    <form
      noValidate
      className="space-y-10 md:space-y-6 w-full"
      action={formAction}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            autoComplete="username"
            type="text"
            name="email"
            id="email"
            className={FormStyles.inputText}
            placeholder="Wpisz swój adres email"
            required
          />
        </div>
        {state?.errors && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
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
        {isPending ? "Wysyłanie..." : "Wyślij"}
        {isPending && <Spinner size={20} />}
      </button>
    </form>
  );
}
