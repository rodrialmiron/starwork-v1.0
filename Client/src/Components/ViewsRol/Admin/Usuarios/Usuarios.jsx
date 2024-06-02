import React, { useEffect, useState } from "react";
import NavUsuarios from "./NavUsuarios";
import Tabla from "./Tabla";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions/adminActions";
import useHandleCheck from "../../../../Hooks/useHandleCheck"
import MostrarRol from "../../MostrarRol/MostrarRol";

const Usuarios = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.allUsers);
  const [selectUsers, setSelectUSers] = useState([]);

  const handleCheck = useHandleCheck(selectUsers, setSelectUSers)

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="flex-col flex-grow">
      <nav>
        <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
          SECCIÓN USUARIOS
          <MostrarRol />
        </h1>
      </nav>
      <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800">
        <NavUsuarios idSelectedUsers={selectUsers} setSelectUSers={setSelectUSers} />
        <Tabla users={users} handleCheck={handleCheck} />
      </div>
    </div>
  );
};

export default Usuarios;
