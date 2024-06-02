import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addClass } from "../../../../redux/actions/adminActions";
import { disabledForSeconds } from "../../../../helpers/utils";

const AddClasses = ({ setAddClass, idCourse }) => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.successAlerts);
  const [disabled, setDisabled] = useState(false);

  const [addedClass, setAddedClass] = useState({
    classNumber: "",
    classTitle: "",
    classContent: "",
    id_course: idCourse,
    link: "",
    menssage: "",
  });

  const handleChange = ({ target }) => {
    setAddedClass({
      ...addedClass,
      [target.name]: target.value,
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    disabledForSeconds(setDisabled);
    dispatch(addClass(addedClass));
  };

  const handleCancel = () => {
    setAddClass(false);
  };

  useEffect(() => {
    if (success) {
      setAddClass(false);
    }
  }, [success]);

  return (
    <Modal
      isOpen={setAddClass}
      className="absolute w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <div>
        <form className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800">
          <h1 className="text-3xl dark:text-white text-center mb-4">Agregar Clase</h1>
          <div className="mb-4 flex items-center justify-center">
            <input
              className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="classTitle"
              id="classTitle"
              placeholder="Nombre de la clase"
              value={addedClass.classTitle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-center">
            <input
              className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="classContent"
              id="classContent"
              placeholder="Contenido de la clase"
              value={addedClass.classContent}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-center">
            <input
              className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="link"
              id="link"
              placeholder="Link"
              value={addedClass.link}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-center">
            <input
              className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              type="text"
              name="menssage"
              id="menssage"
              placeholder="Mensaje"
              value={addedClass.menssage}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-evenly">
            <button
              onClick={handleCancel}
              className="text-gray-100 py-2 px-14 rounded-md bg-red-500 hover:bg-red-700 transition duration-200 font-semibold flex items-center mt-10 gap-x-4"
            >
              <p>Cancelar</p>
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </button>
            <button
              disabled={disabled}
              className="text-gray-100 py-2 px-14 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 font-semibold flex items-center mt-10 gap-x-4"
              onClick={handleAdd}
            >
              <p>Agregar</p>
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddClasses;
