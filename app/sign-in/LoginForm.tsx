"use client";
import { loginUser } from "../lib/actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <form
      noValidate
      className="space-y-10 md:space-y-14 w-full"
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
            className="w-full px-4 py-2 rounded-md bg-black/70 md:bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Wpisz swój adres email"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm mb-1">
            Hasło
          </label>
          <input
            autoComplete="username"
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-2 rounded-md bg-black/70 md:bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Wpisz swoje hasło"
            required
          />
        </div>
      </div>

      {!state?.success && (
        <div className="text-sm text-primary">{state?.message}</div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        {isPending ? "Logowanie..." : "Zaloguj"}
      </button>
    </form>
  );
}
