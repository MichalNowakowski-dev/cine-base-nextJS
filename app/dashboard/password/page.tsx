import { auth } from "@/app/auth";
import PasswordForm from "../components/PasswordForm";
import { redirect } from "next/navigation";

const Password = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Zmień swoje hasło</h2>
      <PasswordForm />
    </div>
  );
};

export default Password;
