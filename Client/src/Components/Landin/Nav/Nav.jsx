import React from "react";
import RegisterButton from "../RegisterButton/RegisterButton.jsx";
import LoginButton from "../LoginButton/LoginButton.jsx";
import DarkMode from "../DarkMode/DarkMode.jsx";
import IconoDarkMode from "../../../assets/Icono-dark-mode.png";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center h-fit">
      <img src={IconoDarkMode} alt="Icono" />
      <div className="flex w-full justify-end items-center gap-x-10 gap-y-2 pr-8  text-white">
        <DarkMode />
        {/* <a className="text-gray-200 font-semibold hover:text-white" href="#">
          Inicio
        </a> */}
        <a
          className="text-gray-200 font-semibold hover:text-white"
          href="/viewcourses"
        >
          Cursos
        </a>
        <a className="text-gray-200 font-semibold hover:text-white" href="/nosotros">
          Nosotros
        </a>
        <a className="text-gray-200 font-semibold hover:text-white" href="#contact" >
          Contáctanos
        </a>
        <LoginButton />
        <RegisterButton />
      </div>
    </nav>
  );
};

export default Nav;