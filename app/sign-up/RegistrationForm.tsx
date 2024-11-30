"use client";
import { useActionState } from "react";

import { addUserToDb } from "../lib/actions";

export default function RegistrationForm() {
  const [state, registerAction, isPending] = useActionState(addUserToDb, null);
  return (
    <form
      noValidate
      action={registerAction}
      className="space-y-4 text-green-300"
    >
      {!state?.success && (
        <p className={`text-red-500 mt-4 `}>{state?.message}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            Imię *
          </label>
          <input
            defaultValue={state?.fields?.firstName as string}
            type="text"
            name="firstName"
            id="firstName"
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
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
            id="lastName"
            name="lastName"
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
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
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="">
        <label htmlFor="password" className="block mb-1">
          Hasło
        </label>
        <input
          defaultValue={state?.fields?.password as string}
          type="password"
          id="password"
          name="password"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md col-span-2"
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-8 py-3 bg-blue-500 w-full text-white rounded-lg hover:bg-primary-dark transition-all"
      >
        {isPending ? "Trwa rejestracja" : "Zarejestruj"}
      </button>
    </form>
  );
}
