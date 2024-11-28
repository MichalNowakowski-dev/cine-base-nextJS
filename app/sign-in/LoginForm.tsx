import React from "react";
import { loginUser } from "../lib/actions";

export default function LoginForm({ error }: { error: string }) {
  return (
    <form noValidate className="space-y-4" action={loginUser}>
      {error && (
        <div className="text-sm text-primary">
          {error === "CallbackRouteError" || "CredentialsSignin"
            ? "Nieprawidłowe dane logowania."
            : "Wystąpił błąd. Skontaktuj się z pomocą techniczną."}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm mb-1">
          Email
        </label>
        <input
          autoComplete="username"
          type="text"
          name="email"
          id="email"
          className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Wpisz swój adres email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm mb-1">
          Hasło
        </label>
        <input
          autoComplete="username"
          type="password"
          name="password"
          id="password"
          className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Wpisz swoje hasło"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Zaloguj
      </button>
    </form>
  );
}
