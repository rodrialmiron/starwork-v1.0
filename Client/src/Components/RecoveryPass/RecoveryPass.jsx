import React, { useState } from "react";
import axios from "axios";

//?COMPONENTES
import { validationsRecovery } from "./validationsRecovery";
import { useNavigate } from "react-router-dom";
import useToast from "../../Hooks/useToast";
import useSuccess from "../../Hooks/useSuccess";
import useError from "../../Hooks/useError";
import LoadingRecovery from "./LoadingRecovery/LoadingRecovery";
import ButtonHome from "../ButtonHome/ButtonHome";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { disabledForSeconds } from "../../helpers/utils";

const RecoveryPass = () => {
 const navigate = useNavigate();
 //*Inicializo estados para manejar la toma de datos de los campos y de los errores
 const [recovery, setRecovery] = useState({
  email: "",
 });

 const [errorsRecovery, setErrorsRecovery] = useState({
  email: "",
 });

 const [isLoading, setIsLoading] = useState(false);

 const { errorAlert, infoAlert } = useToast();

 //* Agrego una nueva variable de estado para el error del formulario
 const [formError, setFormError] = useState("");

 const [disabled,setDisabled] = useState(false)

 const handleSubmit = (event) => {
  disabledForSeconds(setDisabled)
  event.preventDefault();
  const fieldsErrors = validationsRecovery("email", recovery.email);
  setIsLoading(true); // Establecer isLoading a true

  axios
   .post("/recover", {
    email: recovery.email,
   })
   .then((response) => {
    if (response.status === 200)
        navigate("/verify_code");

    infoAlert(useSuccess(response));

    localStorage.setItem("email", response.data.email);
    
   })
   .catch((response) => {
    errorAlert(useError(response))
    setIsLoading(false)
   });

  setErrorsRecovery({
   ...errorsRecovery,
   ...fieldsErrors,
  });

  //* Verificar si todos los campos están completos
  if (!recovery.email) {
   setFormError("Debe completar el campo");
  } else {
   setFormError("");
  }
 };

 //*Toma los datos de los input
 const handleChange = ({ target }) => {
  setRecovery({
   ...recovery,
   [target.name]: target.value,
  });

  const fieldsErrors = validationsRecovery(target.name, target.value);
  setErrorsRecovery({
   ...errorsRecovery,
   [target.name]: fieldsErrors[target.name],
  });
 };

 return (
  <>
   <section className="flex items-center justify-center min-h-screen bg-gray-800">
    <ButtonHome/>
    <div className="relative w-80 bg-gray-100 shadow-2xl rounded-xl">
     <form
      className="flex flex-col items-start p-5 space-y-5"
      onSubmit={handleSubmit}
     >
      <div className="flex flex-col space-y-2">
       <label className="text-lg font-semibold text-gray-800">
        {" "}
        <FontAwesomeIcon icon={faEnvelopeOpenText} /> Recuperación de contraseña
       </label>
       <span className="text-sm font-medium text-gray-600">
        Por favor, ingrese el email con el cual se registró.
       </span>
      </div>
      <input
       placeholder="Ingrese su email"
       autoComplete="off"
       title="Ingrese su email"
       name="email"
       type="email"
       onChange={handleChange}
       value={recovery.email}
       className="w-full h-10 pl-3 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-black focus:border-transparent transition-all duration-300 ease-in-out"
      />
      <span className="text-red-500 ml-5">
       {errorsRecovery.email && errorsRecovery.email}
      </span>

      <button
      disabled={disabled}
       type="submit"
       className="flex items-center justify-center w-full h-10 px-7 py-2 space-x-2.5 bg-gradient-to-b from-custom-blueClaro via-custom-blue to-custom-blueOscuro shadow-sm rounded-md text-white font-semibold text-sm hover:bg-custom-blue hover:from-custom-blue hover:via-custom-blueOscuro hover:to-custom-blueOscuro2"
      >
       {isLoading ? <LoadingRecovery /> : "Enviar"}
      </button>
      {formError && <p className="text-red-500 text-ms">{formError}</p>}
     </form>
    </div>
   </section>
  </>
 );
};

export default RecoveryPass;
