import React, { useEffect } from "react";
import Tabla from "./Tabla";
import { useDispatch, useSelector } from "react-redux";
import MostrarRol from "../../MostrarRol/MostrarRol";
import { getAllCoursesCollab } from "../../../../redux/actions/collabActions";

function Seguimiento() {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.collaborator.courses);

  useEffect(() => {
    dispatch(getAllCoursesCollab());
  }, [])

  return (
    <>
      <nav className="bg-gray-200 dark:bg-gray-800">
        <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
          SECCIÓN SEGUIMIENTO
          <MostrarRol />
        </h1>
        <div className="py-6"></div>
      </nav>

      <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800">
        <Tabla courses={courses} />
      </div>
    </>
  );
}

export default Seguimiento;
