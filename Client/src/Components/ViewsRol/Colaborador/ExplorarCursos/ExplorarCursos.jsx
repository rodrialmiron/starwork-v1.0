import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavExplorar from "./NavExplorar";
import Tabla from "./Tabla";
import {
 searchcourseColla,
 getAllCoursesCollab,
} from "../../../../redux/actions/collabActions";
import useHandleChange from "../../../../Hooks/useHandleChange";
import MostrarRol from "../../MostrarRol/MostrarRol";

const ExplorarCursos = () => {
  const courses = useSelector((state) => state.collaborator.courses);


  const dispatch = useDispatch();
  const [input, setInput] = useState({
    firstName: "",
  });
  const handleChange = useHandleChange(input, setInput);

 useEffect(() => {
  if (input.firstName) {
   dispatch(searchcourseColla(input.firstName));
  } else {
   dispatch(getAllCoursesCollab());
  }
 }, [input.firstName]);

 return (
  <>
   <nav>
    <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
     SECCIÓN EXPLORAR CURSOS
     <MostrarRol />
    </h1>
   </nav>

   <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800">
    <NavExplorar input={input} handleChange={handleChange} />
    <Tabla courses={courses} />
   </div>
  </>
 );
}

export default ExplorarCursos;
