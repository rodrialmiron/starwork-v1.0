import React, { useEffect, useState } from "react";
import validarNumero from "./validate";
import useHandleChange from "../../../../Hooks/useHandleChange";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorAlerts,
  setSucessAlerts,
} from "../../../../redux/slices/userSlice";
import useError from "../../../../Hooks/useError";
import { disabledForSeconds, returnAuthToken } from "../../../../helpers/utils";
import { PhoneInput } from "react-international-phone";

function AñadirColaborador({ setOpenModalAdd }) {
  const dispatch = useDispatch();
  const successAlerts = useSelector((state) => state.user.successAlerts);
  const [disabled,setDisabled] = useState(false)

  const [inputPhoneEmail, setInputPhoneEmail] = useState({
    phone: "",
    email: "",
    limitCode: 0,
    code: "",
  });

  const handleChange = useHandleChange(inputPhoneEmail, setInputPhoneEmail);

  const { id } = JSON.parse(localStorage.getItem("user"));

  const createInvitationWithCode = {
    ...inputPhoneEmail,
    id,
    limitCode: parseInt(inputPhoneEmail.limitCode),
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    disabledForSeconds(setDisabled)
    axios
      .post("/user/accesscode", createInvitationWithCode, returnAuthToken())
      .then(({ data }) => {
        dispatch(setSucessAlerts(data.message));
      })
      .catch((error) => {
        dispatch(setErrorAlerts(useError(error)));
      });
  };

  useEffect(() => {
    if (successAlerts) {
      setOpenModalAdd(false);
    }
  }, [successAlerts]);

  return (
    <div className="w-[600px] p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800">
      <div className="flex justify-center -mt-3 mb-3">
        <h1 className="text-2xl dark:text-white uppercase">
          Añadir Colaborador
        </h1>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="w-full flex justify-between items-center p-2">
          <label htmlFor="" className="text-1xl dark:text-white -mb-3 w-1/3">
            Telefono del colaborador:
          </label>

          <div className="w-3/4 relative py-2">
            <PhoneInput
              defaultCountry="ar"
              value={inputPhoneEmail.phone}
              onChange={(phone) =>
                handleChange({
                  target: { name: "phoneNumber", value: phone },
                })
              }
              inputProps={{
                className:
                  "w-full px-3 leading-tight text-gray-700 border-2 border-gray-300 rounded-e-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white",
                placeholder: "TELEFONO",
              }}
              disableCountryCode={true}
              disableFormatting={true}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center p-2">
          <label htmlFor="" className="text-1xl dark:text-white mb-4 w-1/3 ">
            Email del colaborador:
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            value={inputPhoneEmail.email}
            onChange={handleChange}
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
          />
        </div>
        <div className="w-full flex justify-between items-center p-2">
          <label
            htmlFor="limitCode"
            className="text-1xl dark:text-white mb-4 w-1/3"
          >
            Usos del codigo:
          </label>
          <input
            type="text"
            name="limitCode"
            id="limitCode"
            placeholder="Usos del codigo"
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            value={inputPhoneEmail.limitCode}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-between items-center p-2">
          <label
            htmlFor="limitCode"
            className="text-1xl dark:text-white mb-4 w-1/3"
          >
            Codigo:
          </label>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="Codigo"
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            value={inputPhoneEmail.code}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center p-3">
          <button 
           disabled={disabled}
          className="mr-6 bg-green-500 hover:bg-green-600 rounded-md transition duration-200 text-white font-bold py-2 px-5">
            Añadir
          </button>
          <button
            onClick={() => setOpenModalAdd(false)}
            className="bg-red-500 hover:bg-red-600 rounded-md transition duration-200 text-white font-bold py-2 px-4"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AñadirColaborador;