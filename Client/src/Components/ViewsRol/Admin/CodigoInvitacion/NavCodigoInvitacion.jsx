import React from "react";
import { useState } from "react";
import AddCodigo from "./AddCodigo";


//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavCodigoInvitacion = ({handleChange}) => {

  const [addCode, setAddCode] = useState(false);

  return (
    <>
      <nav className="flex justify-between py-2 px-16">
        <div>
          <button
            onClick={() => setAddCode(true)}
            className="rounded-lg bg-custom-blue transition duration-200 hover:bg-custom-blueOscuro text-white font-bold py-2 px-4"
          >
            Crear codigo
          </button>
          {addCode && (
            <AddCodigo
              className="rounded-lg bg-custom-blue transition duration-200 hover:bg-custom-blueOscuro text-white font-bold py-2 px-4 "
              isOpen={addCode}
              setAddCode={setAddCode}
            />
          )}
        </div>

        <section>
          <div className="flex relative items-center max-w-full">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-0 pr-2 text-gray-400"
            />
            <input
              type="text"
              className="px-7 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              placeholder="Ingrese codigo a buscar"
              name="colla"
              onChange={handleChange}
            />
          </div>
        </section>
      </nav>
    </>
  );
};

export default NavCodigoInvitacion;