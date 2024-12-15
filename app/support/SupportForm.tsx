"use client";

import { useActionState } from "react";
import { sendSupportMessage } from "../lib/actions/support/supportActions";

export default function SupportForm() {
  const [state, formAction, isPending] = useActionState(
    sendSupportMessage,
    null
  );

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6 p-6 border border-borderPrimary rounded-lg bg-backgroundFooter md:flex-grow flex flex-col"
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
        <label htmlFor="phoneNumber" className="block mb-1">
          Numer telefonu
        </label>
        <input
          defaultValue={state?.fields?.phoneNumber as string}
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md col-span-2"
        />
        {state?.errors?.phoneNumber && (
          <p className="text-red-500 text-sm">{state.errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block mb-1">
          Temat zapytania *
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={
            (state?.fields?.subject as string) || "technicalSupport"
          }
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        >
          <option value="general">Ogólne pytania</option>
          <option value="technicalSupport">Wsparcie techniczne</option>
          <option value="billing">Problemy z płatnościami</option>
          <option value="feedback">Opinie i sugestie</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block mb-1">
          Wiadomość *
        </label>
        <textarea
          defaultValue={state?.fields?.message as string}
          id="message"
          name="message"
          placeholder="W czym możemy Ci pomóc?"
          rows={6}
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        />
        {state?.errors?.message && (
          <p className="text-red-500 text-sm">{state.errors.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="privacyPolicy"
              className="appearance-none w-5 h-5 bg-transparent border border-borderPrimary rounded checked:bg-blue-500"
            />
            <span className="text-secondary">
              Akceptuję warunki polityki prywatności *
            </span>
          </label>
          {state?.errors?.privacyPolicy && (
            <p className="text-red-500 text-sm">{state.errors.privacyPolicy}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3 bg-primary w-full text-white rounded-lg hover:bg-primary-dark transition-all"
          >
            {isPending ? "Wysyłanie..." : "Wyślij"}
          </button>
        </div>
      </div>

      {state?.success ? (
        <p className={`text-green-500 mt-4 `}>{state.message}</p>
      ) : (
        <p className={`text-red-500 mt-4 `}>{state?.message}</p>
      )}
    </form>
  );
}
