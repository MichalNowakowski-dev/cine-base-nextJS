import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdSmsFailed } from "react-icons/md";

export default function Message({
  children,
  success,
}: {
  children: React.ReactNode;
  success: boolean;
}) {
  return (
    <p
      className={`${
        success ? "text-green-900 bg-green-200" : "text-red-900 bg-red-200"
      } p-3 rounded-lg flex items-center gap-3 w-full`}
    >
      {success ? <CiCircleCheck size={50} /> : <MdSmsFailed size={50} />}

      {children}
    </p>
  );
}
