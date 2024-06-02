import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../../../redux/actions/adminActions";
import { useEffect,useState } from "react";
import { SelectedCourses } from "./SelectedCourses";
import { disabledForSeconds } from "../../../../helpers/utils";

export const DeleteCourse = ({
 isOpen,
 setDeleteCourse,
 getSelectedCourses,
 idSelectedCourses,
 setIdCourses
}) => {

 const dispatch = useDispatch();

 const success = useSelector((state) => state.user.successAlerts);
 const [disabled,setDisabled] = useState(false)

 const handleNo = () => {
  setDeleteCourse(false);
 };

 const handleDeleteCourse = () => {
    disabledForSeconds(setDisabled)
  idSelectedCourses.forEach((idCourse) => {
   dispatch(deleteCourse(idCourse));
  });
  setDeleteCourse(false);
  setIdCourses([])
 };


 return (
  <Modal
   isOpen={isOpen}
   className="absolute w-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
   overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
  >
   {idSelectedCourses && idSelectedCourses.length === 0 ? (
    <div className="p-4 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white flex flex-col justify-center items-center">
     <span>DEBE SELECCIONAR EL/LOS CURSO/S QUE DESEA ELIMINAR</span>
     <button
      className="ml-5 mt-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
      onClick={() => setDeleteCourse(false)}
     >
      OK
     </button>
    </div>
   ) : (
    <div className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div className="flex flex-col justify-center items-center">
      <span>¿ESTAS SEGURO QUE DESEA ELIMINAR LOS SIGUIENTES CURSOS?</span>

      <div className="flex flex-col justify-center items-center space-y-4">
       {getSelectedCourses().map((course) => {
        return (
         <div key={course.id} className="mt-1 text-center border-b border-gray-600 dark:border-gray-300 w-full">
          <SelectedCourses course={course} />
         </div>
        );
       })}
      </div>

     </div>
     <div className="flex justify-center mt-5 -mb-3">
      <button
      disabled={disabled}
       onClick={handleDeleteCourse}
       className="ml-5 w-10 h-8 rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold"
      >
       SI
      </button>
      <button
       onClick={() => setDeleteCourse(false)}
       className="ml-5 w-10 h-8 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold"
      >
       NO
      </button>
     </div>
    </div>
   )}
  </Modal>
 );
};
