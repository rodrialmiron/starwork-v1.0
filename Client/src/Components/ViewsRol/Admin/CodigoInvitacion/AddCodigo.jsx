import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCode } from "../../../../redux/actions/adminActions";
import Modal from "react-modal";
import { disabledForSeconds } from "../../../../helpers/utils";

function AddCodigo({ isOpen, setAddCode }) {
  const success = useSelector((state) => state.user.successAlerts);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const [code, setCode] = useState({
    code: "",
    email: "",
  });

  const handleChange = ({ target }) => {
    setCode({
      ...code,
      [target.name]: target.value,
    });
  };

  const handleCreateCode = () => {
    disabledForSeconds(setDisabled);
    dispatch(createCode(code));
  };

  useEffect(() => {
    if (success) {
      setAddCode(false);
    }
  }, [success]);

  return (
    <Modal
      isOpen={isOpen}
      className="absolute w-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <div className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center font-semibold">
          <label htmlFor="">Escriba el Codigo</label>
        </div>

        <div className="flex felx-col items-center justify-center mt-1">
          <input
            type="text"
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            onChange={handleChange}
            name="code"
            value={code.code}
            autoComplete="off"
            placeholder="Ingrese Codigo"
          />
        </div>
        <div className="flex justify-center font-semibold mt-6">
          <label htmlFor="">Ingrese el email del usuario</label>
        </div>

        <div className="flex felx-col items-center justify-center mt-1">
          <input
            type="email"
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            onChange={handleChange}
            name="email"
            value={code.email}
            autoComplete="off"
            placeholder="Ingrese el email"
          />
        </div>

        <div className="flex justify-center mt-3">
          <button
            disabled={disabled}
            onClick={handleCreateCode}
            className="ml-1 mt-2 rounded-md bg-green-600 hover:bg-green-800 border-green-700 transition duration-200 text-white font-bold py-1 px-2"
          >
            Confirmar
          </button>
          <button
            onClick={() => setAddCode(false)}
            className="ml-5 mt-2 rounded-md bg-red-600 hover:bg-red-800 border-red-700 transition duration-200 text-white font-bold py-1 px-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddCodigo;
