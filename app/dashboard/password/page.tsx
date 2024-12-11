import { auth } from "@/app/auth";
import PasswordForm from "../components/PasswordForm";
import { redirect } from "next/navigation";
import { getUserPassword } from "@/app/lib/api/userApi";

const Password = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  const hasPassword = await getUserPassword(Number(session.user.id));

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">
        {hasPassword ? "Zmień " : "Ustaw "} hasło
      </h2>
      <PasswordForm hasPassword={hasPassword ? true : false} />
    </div>
  );
};

export default Password;
