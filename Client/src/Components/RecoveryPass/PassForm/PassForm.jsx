import React, { useState } from "react";
import axios from "axios";

//?COMPONENTES
import { validationForm } from "./validationForm";
import { useNavigate } from "react-router-dom";
import useToast from "../../../Hooks/useToast";
import useSuccess from "../../../Hooks/useSuccess";
import useError from "../../../Hooks/useError";
import LoadingRecovery from "../LoadingRecovery/LoadingRecovery";
import ButtonHome from "../../ButtonHome/ButtonHome";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { disabledForSeconds } from "../../../helpers/utils";

const PassForm = () => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    repeatPassword: "",
  });

  const [errorPassword, setErrorPassword] = useState({
    password: "",
    repeatPassword: "",
  });

  const { successAlert, errorAlert } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [disabled, setDisabled] = useState(false)

  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });

    setErrorPassword({
      ...errorPassword,
      [name]: validationForm(name, value, newPassword.password)[name],
    });
  };

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleSubmit = (event) => {
    disabledForSeconds(setDisabled)
    event.preventDefault();
    setIsLoading(true); 


    axios
      .put("/changePassword", {
        email,
        password: newPassword.password,
      })
      .then((response) => {
        successAlert(useSuccess(response));
        navigate("/");
      })
      .catch((error) => {
        errorAlert(useError(response));
      })
      .finally(() => {
        setIsLoading(false); 
      });


    const newErrors = validationForm(
      "repeatPassword",
      newPassword.repeatPassword,
      newPassword.password
    );
    setErrorPassword({
      ...errorPassword,
      ...newErrors,
    });
  
    if (!newPassword.password || !newPassword.repeatPassword) {
      setFormError("Debe completar todos los campos");
    } else {
      setFormError("");
    }
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-gray-800">
        <ButtonHome />
        <div className="relative w-80 bg-gray-100 shadow-2xl rounded-xl">
          <form
            className="flex flex-col items-start p-5 space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-800">
                {" "}
                <FontAwesomeIcon icon={faKey} /> Por favor, ingrese el nuevo password.
              </label>
            </div>

            <label className="text-sm font-medium text-gray-600">
              Ingrese password:
            </label>
            <input
              placeholder="Ingresar Password"
              autoComplete="off"
              title="Ingresar Password"
              name="password"
              type="text"
              value={newPassword.password}
              onChange={handleChange}
              className={`w-full h-10 pl-3 border ${errorPassword.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-1 focus:ring-black focus:border-transparent transition-all duration-300 ease-in-out`}
            />
            {errorPassword.password && (
              <p className="text-red-500 text-ms">{errorPassword.password}</p>
            )}

            <label className="text-sm font-medium text-gray-600">
              Repetir password:
            </label>
            <input
              placeholder="Repetir Password"
              autoComplete="off"
              title="Repetir Password"
              name="repeatPassword"
              type="text"
              value={newPassword.repeatPassword}
              onChange={handleChange}
              className={`w-full h-10 pl-3 border ${errorPassword.repeatPassword ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-1 focus:ring-black focus:border-transparent transition-all duration-300 ease-in-out`}
            />
            {errorPassword.repeatPassword && (
              <p className="text-red-500 text-ms">{errorPassword.repeatPassword}</p>
            )}



            <button
              disabled={disabled}
              type="submit"
              className="flex items-center justify-center w-full h-10 px-7 py-2 space-x-2.5 bg-gradient-to-b from-custom-blueClaro via-custom-blue to-custom-blueOscuro  shadow-sm rounded-md text-white font-semibold text-sm hover:bg-custom-blue hover:from-custom-blue hover:via-custom-blueOscuro hover:to-custom-blueOscuro2"
            >
              {isLoading ? <LoadingRecovery /> : "Recuperar"}
            </button>
            {formError && <p className="text-red-500 text-ms">{formError}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default PassForm;
