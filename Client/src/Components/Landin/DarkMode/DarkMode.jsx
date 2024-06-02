import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkMode = ({ noBorder, displayNone }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("color-theme") === "dark"
  );

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const savedTheme = localStorage.getItem("color-theme");
    if (savedTheme && savedTheme !== (prefersDarkMode ? "dark" : "light")) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("color-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <button
      id="theme-toggle"
      type="button"
      title="Modo Oscuro/Claro"
      className={
        displayNone
          ? "invisible absolute"
          : noBorder
          ? `text-gray-200 dark:text-white transition duration-300 text-sm size-fit`
          : "text-gray-800 dark:text-white transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 dark:border-gray-800 border-white rounded-lg text-sm p-2.5 w-11 h-10"
      }
      onClick={toggleDarkMode}
    >
      <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className="text-lg" />
    </button>
  );
  // test!"#"$!$
};

export default DarkMode;
