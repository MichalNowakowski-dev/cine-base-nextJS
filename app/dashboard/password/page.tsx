import { auth } from "@/app/auth";
import PasswordForm from "../components/PasswordForm";
import { redirect } from "next/navigation";

const Password = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Change Your Password</h2>
      <PasswordForm />
    </div>
  );
};

export default Password;
