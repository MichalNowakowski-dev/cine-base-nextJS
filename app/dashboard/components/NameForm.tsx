"use client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { changeUserName } from "@/app/lib/actions";

const NameForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(changeUserName, null);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-[500px]">
      <div>
        <label className="block text-sm">Nowe imię *</label>
        <input
          type="text"
          name="firstName"
          defaultValue={state?.fields?.firstName as string}
          className="mt-1 p-2 w-full bg-gray-800 text-white rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Nowe Nazwisko *</label>
        <input
          type="text"
          name="lastName"
          defaultValue={state?.fields?.lastName as string}
          className="mt-1 p-2 w-full bg-gray-800 text-white rounded"
        />
      </div>
      <div className="w-full flex justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 p-2 bg-green-800 hover:bg-green-500 text-black rounded w-[45%]"
        >
          {isPending ? "Zapisywanie..." : "Zapisz"}
        </button>
        <button
          onClick={() => router.back()}
          type="button"
          className="mt-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded w-[45%]"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default NameForm;
