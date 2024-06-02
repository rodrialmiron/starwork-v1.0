import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCourses,
  updatedClass,
} from "../../../../redux/actions/adminActions";
import { disabledForSeconds } from "../../../../helpers/utils";

export const EditClass = ({ clase, isOpen, setEdit, idClass, idCourse }) => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.successAlerts);
  const course = useSelector((state) => state.admin.allClasses);
  const [disabled,setDisabled] = useState(false)
  
  const [modifiedClass, setModifiedClass] = useState({
    id: "",
    classTitle: "",
    classContent: "",
    link: "",
    menssage: "",
    id_course: idCourse
  });
  
  useEffect(() => {
    setModifiedClass({
      id: clase.id,
      classTitle: clase.classTitle,
      classContent: clase.classContent,
      link: clase.link,
      menssage: clase.menssage,
      id_course: idCourse
    });
  }, [clase]);

  const handleChange = ({ target }) => {
    setModifiedClass({
      ...modifiedClass,
      [target.name]: target.value,
    });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEdit = (event) => {
    disabledForSeconds(setDisabled)
    event.preventDefault();
    dispatch(updatedClass(modifiedClass));
  };

  useEffect(() => {
    if (success) {
      setEdit(false);
    }
  }, [success]);

  return (
    <Modal
      isOpen={isOpen}
      className="absolute w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <section className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
        <form>
          <h1 className="text-3xl dark:text-white mb-4 uppercase felx justify-center text-center">
            Editar Clase
          </h1>
          <div className="mb-4 flex items-center justify-center">
            <label className="mr-2 font-bold">Nombre: </label>
            <input
              className="w-3/4 ml-4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="classTitle"
              id="classTitle"
              placeholder="Nombre de la clase"
              value={modifiedClass.classTitle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-center">
            <label className="mr-1 ml-7 font-bold">Link: </label>
            <input
              className="w-3/4 ml-5 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="link"
              id="link"
              placeholder="Link"
              value={modifiedClass.link}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-center">
            <label className="mr-2 font-bold">Mensaje: </label>
            <input
              className="w-3/4 ml-4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="menssage"
              id="menssage"
              placeholder="Mensaje"
              value={modifiedClass.menssage}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-center">
            <label className="mr-2 font-bold">Contenido: </label>
            <input
              className="w-3/4 ml-4 mr-4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="classContent"
              id="classContent"
              placeholder="Contenido de la clase"
              value={modifiedClass.classContent}
              onChange={handleChange}
            />
          </div>
        </form>

        <div className="flex justify-center items-center mt-5 -mb-3">
          <button
          disabled={disabled}
            className="mr-4 text-gray-100 relative py-2 px-8 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 font-semibold flex items-center gap-x-4"
            onClick={handleEdit}
          >
            <p>Editar</p>
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </button>
          <button
            className="text-gray-100 relative py-2 px-6 rounded-md bg-red-500 hover:bg-red-700 transition duration-200 font-semibold flex items-center gap-x-4"
            onClick={handleCancel}
          >
            <p>Cancelar</p>
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>
      </section>
    </Modal>
  );
};