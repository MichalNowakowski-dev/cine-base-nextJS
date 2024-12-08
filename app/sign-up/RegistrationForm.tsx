"use client";
import { useActionState } from "react";
import { registerUser } from "../lib/actions";
import Spinner from "../components/ui/spinner/Spinner";
import { CiCircleCheck } from "react-icons/ci";

export default function RegistrationForm() {
  const [state, registerAction, isPending] = useActionState(registerUser, null);

  return (
    <>
      {!state?.success && (
        <p className={`text-red-500 mt-4 `}>{state?.message}</p>
      )}
      <form
        noValidate
        action={registerAction}
        className="space-y-10 md:space-y-8 w-full"
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
              id="firstName"
              className="w-full px-4 py-2 rounded-md bg-black/70 md:bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full px-4 py-2 rounded-md bg-black/70 md:bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
            className="w-full px-4 py-2 rounded-md bg-black/70 md:bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
            className="w-full px-4 py-2 rounded-md bg-black/70 md:bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none col-span-2"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        </div>
        {state?.success && (
          <p
            className={`text-green-900 p-3 rounded-lg bg-green-200 flex  items-center gap-3 `}
          >
            <CiCircleCheck size={25} />
            {state?.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-blue-500 w-full text-white rounded-lg hover:bg-primary-dark transition-all flex items-center gap-4 justify-center"
        >
          {isPending ? "Trwa rejestracja" : "Zarejestruj"}
          {isPending && <Spinner size={20} />}
        </button>
      </form>
    </>
  );
}
