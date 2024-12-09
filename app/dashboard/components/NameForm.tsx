"use client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { changeUserName } from "@/app/lib/actions";
import Spinner from "@/app/components/ui/spinner/Spinner";

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
          className="mt-1 p-2 w-full bg-backgroundDashboardCard text-white rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Nowe Nazwisko *</label>
        <input
          type="text"
          name="lastName"
          defaultValue={state?.fields?.lastName as string}
          className="mt-1 p-2 w-full bg-backgroundDashboardCard text-white rounded"
        />
      </div>
      <div className="w-full flex justify-between">
        <button
          disabled={isPending}
          className={`mt-4 px-6 py-2 rounded bg-green-600 text-white font-medium flex items-center gap-3 w-[45%] justify-center ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {isPending ? "Zmiana hasła..." : "Zatwierdź"}
          {isPending && <Spinner size={20} />}
        </button>
        <button
          onClick={() => router.back()}
          type="button"
          className="mt-4 p-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded w-[45%]"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default NameForm;
