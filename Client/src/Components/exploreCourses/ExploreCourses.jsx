import Tabla from "../ViewsRol/Admin/Courses/Tabla"
import { getAllCourses } from "../../redux/slices/collabSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import useSuccess from "../../Hooks/useSuccess";
import useToast from "../../Hooks/useToast";
import useError from "../../Hooks/useError";

const ExploreCourses = () => {
    const {errorAlert} = useToast()
    const dispatch = useDispatch()
    const allCourses = useSelector((state)=>state.collabs?.courses);
    
    useEffect(()=>{
        
    },[])

    return(
    <div>
     <nav>
        <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
          SECCIÓN CURSOS
        </h1>
      </nav>
      <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800">

      <div className="flex justify-end">
          <input
            type="text"
            className="px-3 py-2 mt-3 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            placeholder="Ingrese curso a buscar"
          />
          <button className="ml-11 mt-4 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4 ">
            Buscar
          </button>
        </div>

        <Tabla allCourses={allCourses} />
      </div>
    </div>)
}

export default ExploreCourses