import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const savedColorTheme = localStorage.getItem("color-theme");
const isDarkMode = savedColorTheme && savedColorTheme.match("dark");

const defaultOptions = {
  position: "bottom-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: isDarkMode ? "dark" : "light",
};
if (!savedColorTheme) {
  localStorage.setItem("color-theme", defaultOptions.theme);
}
const useToast = () => {
  const successAlert = (message) => {
    toast.success(message, defaultOptions);
  };

  const errorAlert = (message) => {
    toast.error(message, defaultOptions);
  };

  const warningAlert = (message) => {
    toast.warn(message, defaultOptions);
  };

  const infoAlert = (message) => {
    toast.info(message, defaultOptions);
  };

  return { successAlert, errorAlert, warningAlert, infoAlert };
};

export default useToast;
