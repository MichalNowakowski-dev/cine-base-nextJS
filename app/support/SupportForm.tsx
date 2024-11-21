"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useRef } from "react";
import { sendSupportMessage } from "../lib/actions";
import { formSchema } from "./formSchema";

type FormData = z.infer<typeof formSchema>;

export default function SupportPage() {
  const [error, formAction, isPending] = useActionState(
    sendSupportMessage,
    null
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      onSubmit={handleSubmit(() => formRef.current?.submit())}
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
            {...register("firstName")}
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">
            Nazwisko *
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          placeholder="xxx@example.com"
          {...register("email")}
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="">
        <label htmlFor="phoneNumber" className="block mb-1">
          Numer telefonu
        </label>
        <input
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber")}
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md col-span-2"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1">
          Wiadomość *
        </label>
        <textarea
          id="message"
          placeholder="W czym możemy Ci pomóc?"
          rows={6}
          {...register("message")}
          className="w-full p-2 border border-borderPrimary bg-backgroundLight rounded-md"
        ></textarea>
        {errors.message && (
          <p className="text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("privacyPolicy")}
              className="appearance-none w-5 h-5 bg-transparent border border-borderPrimary rounded checked:bg-blue-500"
            />
            <span className="text-secondary">
              Akceptuję warunki polityki prywatności
            </span>
          </label>
          {errors.privacyPolicy && (
            <p className="text-sm text-red-600">
              {errors.privacyPolicy.message}
            </p>
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

      {error?.success && <p className="mt-4 text-green-500">{error.message}</p>}
      {error && !error.success && (
        <p className="mt-4 text-red-500">{error.message}</p>
      )}
    </form>
  );
}
