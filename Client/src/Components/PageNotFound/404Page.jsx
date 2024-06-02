import DarkMode from "../Landin/DarkMode/DarkMode";
import iconoLightMode from "../../assets/Icono.png";
import iconoDarkMode from "../../assets/Icono-dark-mode.png";
import pageNotFound from "../../assets/page-not-found.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  const isDarkMode = localStorage.getItem("color-theme").match("dark");

  return (
    <div className="min-h-screen bg-gray-300 dark:text-white dark:bg-gray-800 transition duration-300 flex justify-center">
      <DarkMode displayNone />
      <img
        src={isDarkMode ? iconoDarkMode : iconoLightMode}
        alt=""
        className="size-fit absolute left-0"
      />
      <div className="flex flex-col justify-center text-center items-center">
        <h1 className="text-4xl my-3">Ups, esta página no existe...</h1>
        <img
          src={pageNotFound}
          alt="404 Page Image"
          className="w-[500px] h-[500px]"
        />
        <Link
          to="/"
          className="rounded-lg relative w-48 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group active:bg-custom-blue active:border-custom-blue"
        >
          <span className="text-gray-100 font-bold ml-8 transform group-hover:translate-x-10 transition-all duration-300">
            Volver al Inicio
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <FontAwesomeIcon icon={faHouse} className="text-white" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
