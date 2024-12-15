"use client";
import { useActionState } from "react";
import { registerUser } from "../lib/actions/user/userActions";
import Spinner from "../components/ui/spinner/Spinner";

import Message from "../components/ui/message/Message";
import { FormStyles } from "../styles";

export default function RegistrationForm() {
  const [state, registerAction, isPending] = useActionState(registerUser, null);

  return (
    <form
      noValidate
      action={registerAction}
      className="space-y-4 md:space-y-8 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            Imię *
          </label>
          <input
            defaultValue={state?.fields?.firstName as string}
            type="text"
            name="firstName"
            placeholder="Imię"
            id="firstName"
            className={FormStyles.inputText}
          />
          {state?.errors?.firstName && (
            <p className="text-red-500 text-sm">{state.errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">
            Nazwisko *
          </label>
          <input
            defaultValue={state?.fields?.lastName as string}
            type="text"
            placeholder="Nazwisko"
            id="lastName"
            name="lastName"
            className={FormStyles.inputText}
          />
          {state?.errors?.lastName && (
            <p className="text-red-500 text-sm">{state.errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">
          Email *
        </label>
        <input
          defaultValue={state?.fields?.email as string}
          type="email"
          id="email"
          name="email"
          placeholder="xxx@example.com"
          className={FormStyles.inputText}
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="">
        <label htmlFor="password" className="block mb-1">
          Hasło *
        </label>
        <input
          defaultValue={state?.fields?.password as string}
          type="password"
          placeholder="Hasło"
          id="password"
          name="password"
          className={FormStyles.inputText}
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password}</p>
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
        {isPending ? "Trwa rejestracja" : "Zarejestruj"}
        {isPending && <Spinner size={20} />}
      </button>
    </form>
  );
}
