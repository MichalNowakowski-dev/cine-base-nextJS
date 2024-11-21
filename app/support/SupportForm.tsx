"use client";

import { useActionState, useEffect, useState } from "react";
import { sendSupportMessage } from "../lib/actions";

export default function SupportPage() {
  const [error, formAction, isPending] = useActionState(
    sendSupportMessage,
    null
  );

  return (
    <form
      action={formAction}
      className="space-y-6 p-6 border border-borderPrimary rounded-lg bg-backgroundFooter md:flex-grow flex flex-col"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            Imię *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md "
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">
            Nazwisko *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md "
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">
          Email *
        </label>
        <input
          type="email"
          placeholder="xxx@example.com"
          id="email"
          name="email"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md "
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <label htmlFor="phoneNumber" className="block mb-1 col-span-full">
          Numer telefonu
        </label>

        <select
          id="countryCode"
          name="countryCode"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md col-span-1"
        >
          <option value="+48">+48</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md  col-span-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1">
          Wiadomość *
        </label>
        <textarea
          placeholder="W czym możemy Ci pomóc?"
          id="message"
          name="message"
          rows={6}
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        ></textarea>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row justify-between ">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="privacyPolicy"
              required
              className="appearance-none w-5 h-5 bg-transparent border border-borderPrimary rounded checked:bg-blue-500  "
            />
            <span className="text-secondary">
              Akceptuję warunki polityki prywatności
            </span>
          </label>
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
      {error?.success && <p className="mt-4 text-green-500">{error.message}</p>}
      {/* {!error.success && (
          <p className="mt-4 text-red-500">{error.message}</p>
        )} */}
    </form>
  );
}
