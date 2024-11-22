"use client";

import { useActionState } from "react";
import { sendSupportMessage } from "../lib/actions";

export default function SupportPage() {
  const [error, formAction, isPending] = useActionState(
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
            type="text"
            name="firstName"
            id="firstName"
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
          />
          {/* {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )} */}
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">
            Nazwisko *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
          />
          {/* {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )} */}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="xxx@example.com"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        />
        {/* {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )} */}
      </div>

      <div className="">
        <label htmlFor="phoneNumber" className="block mb-1">
          Numer telefonu
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md col-span-2"
        />
        {/* {errors.phoneNumber && (
          <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
        )} */}
      </div>

      <div>
        <label htmlFor="subject" className="block mb-1">
          Temat zapytania *
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        >
          <option value="">Wybierz temat</option>
          <option value="technicalSupport">Wsparcie techniczne</option>
          <option value="billing">Problemy z płatnościami</option>
          <option value="general">Ogólne pytania</option>
          <option value="feedback">Opinie i sugestie</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block mb-1">
          Wiadomość *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="W czym możemy Ci pomóc?"
          rows={6}
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        ></textarea>
        {/* {errors.message && (
          <p className="text-sm text-red-600">{errors.message.message}</p>
        )} */}
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
              Akceptuję warunki polityki prywatności
            </span>
          </label>
          {/* {errors.privacyPolicy && (
            <p className="text-sm text-red-600">
              {errors.privacyPolicy.message}
            </p>
          )} */}
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

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </form>
  );
}
