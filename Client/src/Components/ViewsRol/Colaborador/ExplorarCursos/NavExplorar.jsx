import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NavExplorar({ input, handleChange }) {
  return (
    <>
      <nav className="flex justify-end py-2 px-10 gap-x-6">
        <div className="flex relative items-center max-w-full">
          <input
            type="text"
            className="px-3 text-center py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            value={input.firstName}
            onChange={handleChange}
            name="firstName"
            placeholder="Ingrese curso a buscar"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-0 pr-2 text-gray-400"
          />
        </div>
      </nav>
    </>
  );
}

export default NavExplorar;
