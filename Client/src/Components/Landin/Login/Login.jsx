import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validationsLogin } from "./validationsLogin";
import useToast from "../../../Hooks/useToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import useError from "../../../Hooks/useError";
import { VerifyEmail } from "../VerifyEmail/VerifyEmail";

function Login() {
  const navigate = useNavigate();
  const { successAlert, errorAlert } = useToast();
  const [openVerifyEmail, setOpenVerifyEmail] = useState(false);
  const [loginWasClicked, setLoginWasClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [errorsLogin, setErrorsLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setLoginUser({
      ...loginUser,
      [target.name]: target.value,
    });
    const fieldsErrors = validationsLogin(target.name, target.value);
    setErrorsLogin({
      ...errorsLogin,
      [target.name]: fieldsErrors[target.name],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginWasClicked(true);

    axios
      .post("/login", loginUser)
      .then((response) => {
        const { access, token, role, id } = response.data.loginSuccess;
        const user = { access, token, role, id };
        localStorage.setItem("user", JSON.stringify(user));
        if (role == 1) navigate("/user/admin/profile");
        if (role == 2) navigate("/user/supervisor/profile");
        if (role == 3) navigate("/user/collaborator/profile");
        if (access) {
          successAlert(
            `Iniciaste sesión como ${role === 1 ? "administrador" : role === 2 ? "supervisor" : "colaborador"}.`
          );
        }
      })
      .catch((error) => {
        setLoginWasClicked(false);
        errorAlert(useError(error));
        if (error.response.data.error === "Email no verificado") {
          // Guardar el email en el local storage
          localStorage.setItem("email", loginUser.email);
          setOpenVerifyEmail(true);
        }
      });
  };

  return (
    <>
      {!openVerifyEmail ? (
        <div className="flex flex-col items-center justify-center dark:text-white">
          <form
            className="w-[500px] h-[300px] items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md overflow-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold flex items-center justify-center mb-2 -mt-5 ">Login</h1>
            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-gray-700 dark:text-gray-200 w-1/4" htmlFor="userName">
                Email:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type="text"
                name="email"
                id="email"
                placeholder="Nombre de usuario"
                value={loginUser.email}
                onChange={handleChange}
              />
            </div>
            <span className="text-red-500 block mx-20 mb-4">{errorsLogin.email && errorsLogin.email}</span>
            <div className="flex relative items-center max-w-full">
              <label className="mr-2 text-sm font-bold text-gray-700 w-1/4 dark:text-gray-200" htmlFor="userPassword">
                Contraseña:
              </label>
              <input
                className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Contraseña"
                value={loginUser.password}
                onChange={handleChange}
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
            <span className="text-red-500 block mx-20 mb-4">{errorsLogin.password && errorsLogin.password}</span>
            <div className="mb-4 flex items-center justify-center">
              <Link to="recovery_password" className="size-fit text-blue-500 hover:text-blue-700">
                <h1>Olvidé mi contraseña</h1>
              </Link>
            </div>
            <div className="flex items-center justify-center mt-6">
              {loginWasClicked ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="rounded-lg relative w-48 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue active:bg-custom-blue active:border-custom-blue"
                >
                  <span className="text-gray-100 font-bold ml-A transform group-hover:translate-x-10 transition-all duration-300">
                    LOGIN
                  </span>
                  <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                    <FontAwesomeIcon icon={faRightToBracket} className="text-white" />
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        openVerifyEmail && navigate("/verifyEmail")
      )}
    </>
  );
}

export default Login;
