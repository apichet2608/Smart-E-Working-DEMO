import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    autoClose: 2000,
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    autoClose: 2000,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    autoClose: 2000,
  });
};
