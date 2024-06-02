import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../../../redux/actions/adminActions";
import { useValidateFields } from "../../../../Hooks/useValidateFields";
import { disabledForSeconds } from "../../../../helpers/utils";

function AddCourse({ modalIsOpen, closeModal }) {
  const dispatch = useDispatch();
  const [disabled,setDisabled] = useState(false)

  const success = useSelector((state) => state.user.successAlerts);

  const [addedCourse, setAddedCourse] = useState({
    courseName: "",
    description: "",
    topic: "",
  });
  const [errorMaxLength, setErrorMaxLength] = useState({
    courseName: "",
    topic: "",
    description: "",
  });
  const handleChange = ({ target }) => {
    setAddedCourse({
      ...addedCourse,
      [target.name]: target.value,
    });
    setErrorMaxLength(useValidateFields(target.name, target.value))
  };
  const handleAdd = () => {
    disabledForSeconds(setDisabled)
    dispatch(addCourse(addedCourse));
  };

  const handleCancel = () => {
    closeModal();
  };

  useEffect(() => {
    if (success) {
      closeModal();
    }
  }, [success]);

  return (
    <section className="w-[800px] p-2 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800">
      <span className="dark:text-white text-2xl flex justify-center uppercase">
        Añadir Curso
      </span>

      <section>
        <div className="flex flex-col my-4 gap-3 items-center">
          <input
            type="text"
            placeholder="Nombre del Curso"
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            name="courseName"
            onChange={handleChange}
            value={addedCourse.courseName}
          />
          <input
            type="text"
            placeholder="Tema"
            className="w-3/4 px-3 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            name="topic"
            onChange={handleChange}
            value={addedCourse.topic}
          />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <textarea
            maxLength={200}
            name="description"
            placeholder="Descripcion"
            className="w-3/4 px-3 py-2 max-h-52 min-h-24 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            onChange={handleChange}
            value={addedCourse.description}
          />
          <span className="dark:text-white">{errorMaxLength.description && errorMaxLength.description}</span>
        </div>
      </section>

      <section className="flex justify-center items-center mt-3">
        <button
          disabled={disabled}
          className="mr-4 rounded-lg relative w-34 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue active:bg-custom-blue active:border-custom-blue"
          onClick={handleAdd}
        >
          <span className="text-gray-100 font-bold ml-5 mr-16 transform group-hover:translate-x-10 transition-all duration-300">
            Añadir
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }}/>
          </span>
        </button>

        <button
          className="rounded-lg relative w-34 h-10 cursor-pointer flex items-center border border-custom-blue bg-custom-blue group hover:bg-custom-blue active:bg-custom-blue active:border-custom-blue"
          onClick={handleCancel}
        >
          <span className="text-gray-100 font-bold ml-5 mr-12 transform group-hover:translate-x-10 transition-all duration-300">
            Cancelar
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-custom-blue flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff" }} />
          </span>
        </button>
      </section>
      
    </section>
  );
}

export default AddCourse;
