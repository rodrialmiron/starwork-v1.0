import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setVerification } from "../../../redux/slices/userSlice.js";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useToast from "../../../Hooks/useToast.js";
import Loading from "../Loading/Loading.jsx";
import useError from "../../../Hooks/useError.js";
import useSuccess from "../../../Hooks/useSuccess";
import restarTresMin from "./restarTresMin.js";
import ButtonHome from "../../ButtonHome/ButtonHome.jsx";
import { useNavigate } from "react-router-dom";

export const VerifyEmail = ({ horaCreacion }) => {
  const navigate = useNavigate()
  // Obtener el email del localStorage
  const email = localStorage.getItem("email");

  const isVerified = useSelector((state) => state.user.isVerified);
  const dispatch = useDispatch();

  const { successAlert, errorAlert } = useToast();

  const [verifyWasClicked, setVerifyWasClicked] = useState(false);

  const [isVerify, setIsVerify] = useState(false);

  const [code, setCode] = useState({
    code: "",
  });
  const [message, setMessage] = useState("");
  const [horaCreacionCod, setHoraCreacionCod] = useState("");
  const [manejoPeticion, setManejoPeticion] = useState("");
  const handleChange = ({ target }) => {
    setCode({
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    setHoraCreacionCod(horaCreacion);
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (manejoPeticion === "") {
      setVerifyWasClicked(true);

      try {
        const response = await axios.post("/recover", {
          email,
        });
        setHoraCreacionCod(new Date(response.data.createdAt));
        setManejoPeticion("else");
        setVerifyWasClicked(false);
        successAlert(useSuccess(response));
      } catch (error) {
        if (error.response.data.createdAt) {
          let hora = new Date(error.response.data.createdAt);
          setHoraCreacionCod(hora);
          let tiempo = restarTresMin(hora);
          errorAlert(
            `Debes esperar ${tiempo} para poder enviar otro codigo de recuperacion`
          );

          setManejoPeticion("else");
        } else {
          errorAlert(useError(error));
        }
        setVerifyWasClicked(false);
      }
    } else {
      let tiempo = restarTresMin(horaCreacionCod);
      if (tiempo === "Tiempo expirado") {
        setManejoPeticion("");
      } else {
        errorAlert(
          `Debes esperar ${tiempo} para poder enviar otro codigo de recuperacion`
        );
        setManejoPeticion("else");
      }
    }
  };

  const codeUser = code.code;

  const handleSubmit = (event) => {
    event.preventDefault();
    setVerifyWasClicked(true);
    axios
      .post("/verify", { email, codeUser })
      .then((response) => {
        setIsVerify(true);
        setMessage(useSuccess(response));
        successAlert(useSuccess(response));
        localStorage.removeItem("email")
        navigate("/")
        dispatch(setVerification(true));
        setVerifyWasClicked(false);
        setShowReenviarButton(true);
      })
      .catch((error) => {
        setVerifyWasClicked(false);
        errorAlert(useError(error));
      });
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-800">
      <ButtonHome/>
        <form  className="flex flex-col p-5 space-y-5 bg-gray-200 rounded-xl w-[464px]" onSubmit={handleSubmit}>
          <h1 className="text-center font-semibold uppercase ">
            Ingrese el código de verificación
          </h1>
          <div className="flex items-center justify-center my-4">
            <label></label>
            <input
              className="px-3 py-2 text-center leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              name="code"
              id="code"
              placeholder="INGRESE CODIGO"
              value={code.code}
              onChange={handleChange}
            />
          </div>
            {!isVerify && <span>{message}</span>}
          <div className="flex items-center justify-center mt-11 -mb-3">
            {verifyWasClicked ? (
              <Loading />
            ) : (
              <>
                <button
                  id="btnReenviar"
                  onClick={handleClick}
                  className="ml-3 rounded-lg relative w-48 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue active:bg-custom-blue active:border-custom-blue mr-2"
                >
                  <span className="text-gray-100 size-4 -mt-8 font-bold ml-11 transform group-hover:translate-x-10 transition-all duration-300">
                    REENVIAR CODIGO
                  </span>
                  <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                </button>

                <button
                  type="submit"
                  className="rounded-lg relative w-48 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue active:bg-custom-blue active:border-custom-blue ml-2 mr-3"
                >
                  <span className="text-gray-100 font-bold ml-14 transform group-hover:translate-x-10 transition-all duration-300">
                    ENVIAR
                  </span>
                  <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                </button>
              </>
            )}
          </div>
        </form>
    </section>
  );
};
