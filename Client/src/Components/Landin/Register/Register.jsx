import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validateRegister } from "./validateRegister.js";
import "react-international-phone/style.css";
import { useDispatch } from "react-redux";
import { PhoneInput } from "react-international-phone";
import useToast from "../../../Hooks/useToast";
import axios from "axios";
import { setRegistration } from "../../../redux/slices/userSlice.js";
import { VerifyEmail } from "../VerifyEmail/VerifyEmail";
import Loading from "../Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const { successAlert, errorAlert, infoAlert } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPhone, setShowErrorPhone] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [horaCreacion, setHoraCreacion] = useState("");
  const [registerWasClicked, setRegisterWasClicked] = useState(false);

  const [registeredUser, setRegisteredUser] = useState(false);

  const [newUser, setnewUser] = useState({
    code: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    company: "",
    position: "",
    sector: "",
  });

  const [formErrors, setFormErrors] = useState({
    code: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
    company: "",
    position: "",
    sector: "",
  });

  const [showError, setShowError] = useState("");

  const handleChange = ({ target }) => {
    if (target.name === "phoneNumber") {
      if (!showErrorPhone && target.value !== "+54") setShowErrorPhone(true);
      setnewUser({
        ...newUser,
        phoneNumber: target.value,
      });
    } else if (target.name === "repeatPassword") {
      setnewUser({
        ...newUser,
        [target.name]: target.value,
      });
    } else {
      setnewUser({
        ...newUser,
        [target.name]: target.value,
      });
    }

    const fieldErrors = validateRegister(target.name, target.value, newUser.password);

    setFormErrors({
      ...formErrors,
      [target.name]: fieldErrors[target.name],
    });
  };

  const verifyEmail = newUser.email;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = { ...newUser, code: newUser.code.toUpperCase() };

    updatedUser;

    const validations = Object.values(formErrors);
    const emptyFields = Object.values(newUser);

    if (
      newUser.code === "" ||
      newUser.firstName === "" ||
      newUser.lastName === "" ||
      newUser.phoneNumber === "" ||
      newUser.email === "" ||
      newUser.password === "" ||
      newUser.company === "" ||
      newUser.position === "" ||
      newUser.sector === "" ||
      formErrors.code ||
      formErrors.firstName ||
      formErrors.lastName ||
      formErrors.phoneNumber ||
      formErrors.email ||
      formErrors.password ||
      formErrors.repeatPassword ||
      formErrors.company ||
      formErrors.position ||
      formErrors.sector
    ) {
      setShowError("Por favor, completa todos los campos correctamente.");

      return;
    } else {
      setShowError("");
    }

    if (validations.every((validation) => !validation) && emptyFields.every((field) => field.trim() !== "")) {
      try {
        const response = await axios.post("/register", updatedUser);
        setHoraCreacion(new Date(response.data.codeVerify));
        "Usuario registrado Exitososamente!", response.data;
        setRegisterWasClicked(true);

        successAlert("¡Usuario registrado exitosamente!");

        setTimeout(() => {
          infoAlert("Revise su correo para validar su identidad.");          
          localStorage.setItem("email", newUser.email);
          dispatch(setRegistration(true));
          setRegisteredUser(true);
        }, 5000);

      } catch (error) {
        setRegisterWasClicked(false);
        if (error.response) {
          setShowError(error.response.data || "Error desconocido al registrar.");
          errorAlert(error.response.data.error);
        } else if (error.request) {
          setShowError("No se recibió respuesta del servidor.");
        } else {
          setShowError("Error al enviar la petición.");
        }
      }
    } else {
      setRegisterWasClicked(false);
      setShowError(
        "Parece que hubo un problema al enviar el registro. Por favor, revise los datos e inténtelo nuevamente."
      );
    }
  };

  return (
    <>
      {registeredUser ? (
        navigate("/verifyEmail")
      ) : (
        <div className="flex flex-col w-[590px] dark:text-white">
          <form
            className="max-h-128 p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800"
            onSubmit={handleSubmit}
          >
            <h1 className=" text-2xl font-bold flex items-center justify-center mb-2 -mt-5">Registro</h1>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="registerCode">
                CODIGO DE REGISTRO:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="code"
                id="code"
                placeholder="CODIGO DE REGISTRO"
                onChange={handleChange}
                value={newUser.code}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.code && formErrors.code}</span>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="fullname">
                NOMBRE/S:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="NOMBRE/S"
                onChange={handleChange}
                value={newUser.firstName}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.firstName && formErrors.firstName}</span>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="fullname">
                APELLIDO/S:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="APELLIDO/S"
                onChange={handleChange}
                value={newUser.lastName}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.lastName && formErrors.lastName}</span>
            <div className="mb-4 h-[40px] flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="phone">
                TELEFONO:
              </label>

              <div className="w-3/4 relative py-2">
                <PhoneInput
                  defaultCountry="ar"
                  value={newUser.phoneNumber}
                  onChange={(phoneNumber) =>
                    handleChange({
                      target: { name: "phoneNumber", value: phoneNumber },
                    })
                  }
                  inputProps={{
                    className:
                      "w-full px-3 leading-tight text-gray-700 border-2 border-gray-300 rounded-e-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white",
                    placeholder: "TELEFONO",
                  }}
                  disableFormatting={true}
                />
              </div>
            </div>
            {showErrorPhone && (
              <span className="text-red-500 block mx-20 mb-4">{formErrors.phoneNumber && formErrors.phoneNumber}</span>
            )}

            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="email">
                EMAIL:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="email"
                name="email"
                id="email"
                placeholder="EMAIL"
                onChange={handleChange}
                value={newUser.email}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.email && formErrors.email}</span>
            <div className="flex relative items-center max-w-full">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="password">
                CONTRASEÑA:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="CONTRASEÑA"
                onChange={handleChange}
                value={newUser.password}
                autoComplete="off"
              />
              <button
                type="button"
                title="Revelar Password"
                className="absolute right-0 pr-4"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="dark:text-white" />
              </button>
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.password && formErrors.password}</span>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="repeatPassword">
                REPETIR CONTRASEÑA:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type={showPassword ? "text" : "password"}
                name="repeatPassword"
                id="repeatPassword"
                placeholder="REPETIR CONTRASEÑA"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">
              {formErrors.repeatPassword && formErrors.repeatPassword}
            </span>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="company">
                EMPRESA:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="company"
                id="company"
                placeholder="EMPRESA"
                onChange={handleChange}
                value={newUser.company}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.company && formErrors.company}</span>
            <div className="mb-4 flex items-center">
              <label
                className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200"
                htmlFor="positionCompany"
              >
                CARGO:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="position"
                id="position"
                placeholder="CARGO"
                onChange={handleChange}
                value={newUser.position}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.position && formErrors.position}</span>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="sector">
                SECTOR/AREA:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="sector"
                id="sector"
                placeholder="SECTOR/AREA"
                onChange={handleChange}
                value={newUser.sector}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{formErrors.sector && formErrors.sector}</span>

            <div className="flex text-center">
              <div className="text-red-500 block mx-20 mb-4">{showError.error && <div>{showError.error}</div>}</div>
            </div>

            <div className="flex items-center justify-center mt-6">
              {registerWasClicked ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  disabled={disabled}
                  className="rounded-lg relative w-48 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue active:bg-custom-blue active:border-custom-blue"
                >
                  <span className="text-gray-100 font-bold ml-8 transform group-hover:translate-x-10 transition-all duration-300">
                    REGISTRARSE
                  </span>
                  <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                    <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#ffffff" }} />
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;