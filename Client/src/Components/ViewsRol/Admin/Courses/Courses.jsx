import React, { useEffect, useState } from "react";
import NavCourses from "./NavCourses";
import Tabla from "./Tabla";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../../redux/actions/adminActions";
import useHandleCheck from "../../../../Hooks/useHandleCheck"
import MostrarRol from "../../MostrarRol/MostrarRol";

function Courses() {
 const dispatch = useDispatch();
 const [idCourses, setIdCourses] = useState([]);
 const handleCheck = useHandleCheck(idCourses, setIdCourses);

 useEffect(() => {
  dispatch(getAllCourses());
 }, []);


 return (
  <div className=" flex-grow">
   <nav>
    <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
     SECCIÓN CURSOS
     <MostrarRol />
    </h1>
   </nav>

   <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800">
    <NavCourses idSelectedCourses={idCourses} setIdCourses={setIdCourses}/>

    <Tabla handleCheck={handleCheck}/>
   </div>
  </div>
 );
}

export default Courses;