import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  editCourse,
  getAllCourses,
} from "../../../../redux/actions/adminActions";
import { useValidateFields } from "../../../../Hooks/useValidateFields";
import { disabledForSeconds } from "../../../../helpers/utils";

Modal.setAppElement("#root");

export const EditCourse = ({ isOpen, setEditCourse }) => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.successAlerts);
  const course = useSelector((state) => state.admin.allClasses);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const [modifiedCourse, setModifiedCourse] = useState({
    id: "",
    courseName: "",
    topic: "",
    description: "",
  });

  const [errorMaxLength, setErrorMaxLength] = useState({
    courseName: "",
    topic: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setModifiedCourse({
      ...modifiedCourse,
      [target.name]: target.value,
    });
    setErrorMaxLength(useValidateFields(target.name, target.value));
  };
  const handleEdit = () => {
    disabledForSeconds(setDisabled);
    dispatch(editCourse(modifiedCourse));
  };

  const handleCancel = () => {
    setEditCourse(false);
    dispatch(getAllCourses());
  };

  useEffect(() => {
    setModifiedCourse({
      id: course.id,
      courseName: course.courseName,
      topic: course.topic,
      description: course.description,
    });
  }, [course]);

  useEffect(() => {
    if (success) {
      setEditCourse(false);
    }
  }, [success]);

  return (
    <Modal
      isOpen={isOpen}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <section className="w-[600px] p-2 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800">
        <span className="dark:text-white uppercase text-2xl flex flex-col justify-center items-center">
          Editar Curso
        </span>

        <section className="mt-2 flex flex-col justify-evenly items-center">
          <div className="flex items-center">
            <label className="mr-2 dark:text-white">Nombre:</label>
            <input
              type="text"
              placeholder="Nombre del Curso"
              className="ml-2 w-80 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              name="courseName"
              onChange={handleChange}
              value={modifiedCourse.courseName}
            />
          </div>

          <div className="mt-2 flex items-center">
            <label className="ml-3 mr-2 dark:text-white">Tema:</label>
            <input
              type="text"
              placeholder="Tema"
              className="ml-2 -mr-2 w-80 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              name="topic"
              onChange={handleChange}
              value={modifiedCourse.topic}
            />
          </div>

          <div className="flex items-start mt-4">
            <label className="ml-1 mr-1 dark:text-white">Descripción:</label>
            <div className="flex flex-col gap-3 items-center">
              <textarea
                maxLength={200}
                name="description"
                placeholder="Descripcion"
                className="ml-3 mr-8 w-80 px-5 py-2 max-h-52 min-h-24 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                onChange={handleChange}
                value={modifiedCourse.description}
              />
              <span className="text-red-600 dark:text-red-500">
                {errorMaxLength.description && errorMaxLength.description}
              </span>
            </div>
          </div>
        </section>

        <section className="flex mt-4 items-center justify-center">
          <button
            disabled={disabled}
            className="mr-8 rounded-lg relative w-32 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue"
            onClick={handleEdit}
          >
            <span className="text-gray-100 font-bold ml-9 transform group-hover:translate-x-10 transition-all duration-300">
              Editar
            </span>
            <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <FontAwesomeIcon icon={faPen} style={{ color: "#ffffff" }} />
            </span>
          </button>

          <button
            className="rounded-lg relative w-32 h-10 cursor-pointer flex items-center bg-red-600 group hover:bg-red-600"
            onClick={handleCancel}
          >
            <span className="text-gray-100 font-bold ml-5 transform group-hover:translate-x-10 transition-all duration-300">
              Cancelar
            </span>
            <span className="absolute right-0 h-full w-10 rounded-lg bg-red-600 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff" }} />
            </span>
          </button>
        </section>
      </section>
    </Modal>
  );
};
