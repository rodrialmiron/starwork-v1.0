import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../../../Landin/DarkMode/DarkMode.jsx";
import { slide as Menu } from "react-burger-menu";
import { menuStyles } from "./menuStyles.js";

const NavBar = ({ menuItems, additionalItems }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify({ access: false }));
    navigate("/");
  };

  const isCurrentPage = (route) => {
    return location.pathname === route;
  };

  return (
    <>
      <Menu
        styles={menuStyles}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <div className="flex flex-col justify-between py-4 h-full">
          <ul className="mt-4 gap-y-2 flex flex-col items-center">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={
                  isCurrentPage(item.route)
                    ? "text-white font-semibold flex justify-between py-2 px-2 transition duration-200 bg-custom-blueOscuro w-full rounded-md gap-x-4"
                    : "text-white font-semibold flex transition justify-between py-2 px-2 duration-200 hover:bg-custom-blue w-full rounded-md gap-x-4"
                }
              >
                <Link to={item.route} onClick={handleClose}>
                  <FontAwesomeIcon icon={item.icon} />
                </Link>

                <Link className="w-full" to={item.route} onClick={handleClose}>
                  {additionalItems[index]}
                </Link>
              </li>
            ))}
            <div className="flex justify-center py-3" title="Modo oscuro">
              <DarkMode noBorder />
            </div>
          </ul>
          <li className="text-white font-semibold flex transition justify-between py-2 px-2 duration-200 hover:bg-custom-blue w-full rounded-md gap-x-4">
            <button
              onClick={handleLogout}
              className="w-full flex justify-between items-center"
              title="Cerrar Sesión"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} flip="horizontal" />
              <p className="w-full">Cerrar Sesión</p>
            </button>
          </li>
        </div>
      </Menu>
    </>
  );
};

export default NavBar;
