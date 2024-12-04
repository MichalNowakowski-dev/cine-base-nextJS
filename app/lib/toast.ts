// lib/toast.ts

import { toast } from "react-toastify";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    theme: "dark",
    autoClose: 3000,
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    theme: "dark",
    autoClose: 3000,
  });
};
