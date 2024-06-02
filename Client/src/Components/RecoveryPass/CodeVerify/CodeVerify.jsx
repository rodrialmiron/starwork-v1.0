import React, { useState } from "react";
import axios from "axios";

//?COMPONENTES
import { ValidationCode } from "./ValidationCode";
import { useNavigate } from "react-router-dom";
import useToast from "../../../Hooks/useToast";
import useSuccess from "../../../Hooks/useSuccess";
import useError from "../../../Hooks/useError";
import LoadingRecovery from "../LoadingRecovery/LoadingRecovery";
import ButtonHome from "../../ButtonHome/ButtonHome";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { disabledForSeconds } from "../../../helpers/utils";

const CodeVerify = () => {
 const navigate = useNavigate();

 const { successAlert, errorAlert } = useToast();

 const [isLoading, setIsLoading] = useState(false);

 const [disabled,setDisabled] = useState(false)

 const [codex, setCodex] = useState({
  code1: "",
  code2: "",
  code3: "",
  code4: "",
  code5: "",
  code6: "",
 });

 const [errorsCode, setErrorCode] = useState({
  code1: "",
  code2: "",
  code3: "",
  code4: "",
  code5: "",
  code6: "",
 });

 const [attemptedSubmit, setAttemptedSubmit] = useState(false);

 const email = localStorage.getItem("email");
 const handleSubmit = (event) => {
   disabledForSeconds(setDisabled)
  event.preventDefault();
  const { code1, code2, code3, code4, code5, code6 } = codex;
  setIsLoading(true); 

  axios
   .post("/verifyrecover", {
    codeUser: code1 + code2 + code3 + code4 + code5 + code6,
    email,
   })
   .then((response) => {
    successAlert(useSuccess(response));
    navigate("/passwordInsert");
   })
   .catch((response) => {
    errorAlert(useError(response));
   })
   .finally(() => {
    setIsLoading(false);
   });

  const codigosErrors1 = ValidationCode("code1", codex.code1);
  const codigosErrors2 = ValidationCode("code2", codex.code2);
  const codigosErrors3 = ValidationCode("code3", codex.code3);
  const codigosErrors4 = ValidationCode("code4", codex.code4);
  const codigosErrors5 = ValidationCode("code5", codex.code5);
  const codigosErrors6 = ValidationCode("code6", codex.code6);

  setErrorCode({
   ...errorsCode,
   code1: codigosErrors1.code1,
   code2: codigosErrors2.code2,
   code3: codigosErrors3.code3,
   code4: codigosErrors4.code4,
   code5: codigosErrors5.code5,
   code6: codigosErrors6.code6,
  });
 };

 const handleChange = ({ target }) => {
  setCodex({
   ...codex,
   [target.name]: target.value,
  });

  const codigosErrors = ValidationCode(target.name, target.value);
  setErrorCode({
   ...errorsCode,
   [target.name]: codigosErrors[target.name],
  });
 };

 return (
  <>
   <section className="flex items-center justify-center min-h-screen bg-gray-800">
    <ButtonHome />
    <form
     onSubmit={handleSubmit}
     className="flex flex-col items-center relative overflow-hidden p-5 bg-gradient-to-r bg-gray-100 rounded-lg shadow-2xl max-w-xs mx-auto"
    >
     <div className="mb-2.5">
      <p className="text-base font-semibold text-gray-800">
       <FontAwesomeIcon icon={faCircleCheck} /> Por favor ingrese el código de
       verificación que le llegó a su email.
      </p>
     </div>

     <div className="flex justify-between gap-2.5">
      <input
       placeholder=""
       autoComplete="off"
       type="tel"
       name="code1"
       maxlength="1"
       onChange={handleChange}
       value={codex.code1}
       className="h-10 w-10 outline-none text-center text-3xl text-black rounded-md border border-black bg-white focus:border-blue-500"
      />
      <input
       placeholder=""
       autoComplete="off"
       type="tel"
       name="code2"
       maxlength="1"
       onChange={handleChange}
       value={codex.code2}
       className="h-10 w-10 outline-none text-center text-3xl text-black rounded-md border border-black bg-white focus:border-blue-500"
      />

      <input
       placeholder=""
       autoComplete="off"
       type="tel"
       name="code3"
       maxlength="1"
       onChange={handleChange}
       value={codex.code3}
       className="h-10 w-10 outline-none text-center text-3xl text-black rounded-md border border-black bg-white focus:border-blue-500"
      />

      <input
       placeholder=""
       autoComplete="off"
       type="tel"
       name="code4"
       maxlength="1"
       onChange={handleChange}
       value={codex.code4}
       className="h-10 w-10 outline-none text-center text-3xl text-black rounded-md border border-black bg-white focus:border-blue-500"
      />

      <input
       placeholder=""
       autoComplete="off"
       type="tel"
       name="code5"
       maxlength="1"
       onChange={handleChange}
       value={codex.code5}
       className="h-10 w-10 outline-none text-center text-3xl text-black rounded-md border border-black bg-white focus:border-blue-500"
      />

      <input
       placeholder=""
       autoComplete="off"
       type="tel"
       name="code6"
       maxlength="1"
       onChange={handleChange}
       value={codex.code6}
       className="h-10 w-10 outline-none text-center text-3xl text-black rounded-md border border-black bg-white focus:border-blue-500"
      />
     </div>

     <div className="mt-4">
      <button
      disabled={disabled}
       onClick={() => setAttemptedSubmit(true)}
       className="flex items-center justify-center w-full h-10 px-7 py-2 space-x-2.5 bg-gradient-to-b from-custom-blueClaro via-custom-blue to-custom-blueOscuro  shadow-sm rounded-md text-white font-semibold text-sm hover:bg-custom-blue hover:from-custom-blue hover:via-custom-blueOscuro hover:to-custom-blueOscuro2"
      >
       {isLoading ? <LoadingRecovery /> : "Verificar"}
      </button>
     </div>
     <span className="text-red-500 ml-5">
      {attemptedSubmit &&
       (errorsCode.code1 ||
        errorsCode.code2 ||
        errorsCode.code3 ||
        errorsCode.code4 ||
        errorsCode.code5 ||
        errorsCode.code6)}
     </span>
    </form>
   </section>
  </>
 );
};

export default CodeVerify;
