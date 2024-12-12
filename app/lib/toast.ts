// lib/toast.ts

import { Id, toast, ToastOptions } from "react-toastify";
let toastId: Id;

const toastOptions: ToastOptions = {
  theme: "dark",
  autoClose: 3000,
  position: "bottom-right",
  onClose: () => {
    toastId = "";
  },
};

export const notifySuccess = (message: string) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.success(message, toastOptions);
  }
};
export const notifyInfo = (message: string) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.info(message, toastOptions);
  }
};
export const notifyError = (message: string) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.error(message, toastOptions);
  }
};
