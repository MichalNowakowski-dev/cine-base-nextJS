import { auth } from "@/app/auth";
import ChangePasswordForm from "../components/ChangePasswordForm";
import SetNewPasswordForm from "../components/SetNewPasswordForm";
import { redirect } from "next/navigation";
import { getUserPassword } from "@/app/lib/actions/user/userActions";

const Password = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  const hasPassword = await getUserPassword(Number(session.user.id));

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">
        {hasPassword ? "Zmień " : "Stwórz "} hasło
      </h2>
      {hasPassword ? <ChangePasswordForm /> : <SetNewPasswordForm />}
    </div>
  );
};

export default Password;
