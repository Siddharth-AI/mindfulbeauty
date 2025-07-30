import { toast, ToastOptions } from "react-toastify";

export const showSuccess = (msg: string, options?: ToastOptions) =>
  toast.success(msg, { position: "bottom-right", ...options });

export const showError = (msg: string, options?: ToastOptions) =>
  toast.error(msg, { position: "bottom-right", ...options });
