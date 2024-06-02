import React, { useState } from "react";
import NavColaborador from "./NavColaborador";
import Tabla from "./Tabla";
import useHandleCheck from "../../../../Hooks/useHandleCheck";
import { useSelector } from "react-redux";
import MostrarRol from "../../MostrarRol/MostrarRol";

function Colaborador() {
    const allUsers = useSelector(state=> state.supervisor.allUsers)
    const [selectUsers,setSelectUsers] = useState([]);
    const handleCheck = useHandleCheck(selectUsers,setSelectUsers);

 return (
  <div >
   <nav>
    <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
     SECCIÓN COLABORADOR
     <MostrarRol />
    </h1>
   </nav>

   <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800 w-full">
    <NavColaborador selectUsers={selectUsers} setSelectUsers={setSelectUsers} />
    <Tabla allUsers={allUsers} handleCheck={handleCheck} />
   </div>
  </div>
 );
}

export default Colaborador;
