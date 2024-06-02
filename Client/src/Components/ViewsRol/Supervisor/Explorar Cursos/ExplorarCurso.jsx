import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";

//?COMPONENTES
import useHandleChange from "../../../../Hooks/useHandleChange";
import MostrarRol from "../../MostrarRol/MostrarRol";


function ExplorarCurso() {
    const dispatch = useDispatch()
    const allCourses = useSelector(state=> state.supervisor.allCourses)
    const [input,setInput] = useState({
        course: ""
    });
    const handleChange = useHandleChange(input,setInput)


    useEffect(()=>{
        if(input.course){
            dispatch(searchCourse(input.course))
        }else{
            dispatch(getAllCourses())
        }
    },[input.course])
    
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
    <Tabla allCourses={allCourses} />
   </div>
  </>
 );
}

export default ExplorarCurso;
