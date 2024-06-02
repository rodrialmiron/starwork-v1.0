import React from "react";
import Modal from "react-modal";
import AddCourse from "./AddCourse";
import { useState, useEffect } from "react";
import { DeleteCourse } from "./DeleteCourse";
import { ChangeStatusCourse } from "./ChangeStatusCourse";
import { useDispatch, useSelector } from "react-redux";
import { searchCourse } from "../../../../redux/actions/adminActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const NavCourses = ({idSelectedCourses, setIdCourses}) => {
  const dispatch = useDispatch();

  const allCourses = useSelector((state) => state.admin.allCourses);
  const [courseSearched, setCourseSearched] = useState({
    course: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(false);
  const [changeStatus, setChangeStatusCourse] = useState(false);

  const handleChange = ({ target }) => {
    setCourseSearched({
      course: target.value,
    });
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (modalIsOpen || deleteCourse || changeStatus) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalIsOpen, deleteCourse, changeStatus]);

  const getSelectedCourses = () => {
    let selectedCourses = [];
    idSelectedCourses.forEach((id) => {
      selectedCourses.push(...allCourses.filter((course) => course.id === id));
    });
    return selectedCourses;
  };

  useEffect(() => {
    dispatch(searchCourse(courseSearched.course));
  }, [courseSearched]);
  
  return (
    <div className="flex justify-between py-2 px-16">
      <div>
        <button
          onClick={toggleModal}
          className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4"
        >
          <FontAwesomeIcon icon={faPlus} /> Añadir Curso
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="AddCourse"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded"
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
          shouldCloseOnOverlayClick={true}
        >
          <AddCourse modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </Modal>
      </div>
      <div>
        <button
          className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4 "
          onClick={() => setChangeStatusCourse(true)}
        >
          Habilitar/Inhabilitar
        </button>
        {changeStatus && (
          <ChangeStatusCourse
            isOpen={changeStatus}
            setChangeStatusCourse={setChangeStatusCourse}
            getSelectedCourses={getSelectedCourses}
            idSelectedCourses={idSelectedCourses}
          />
        )}
      </div>
      <div>
        <button
          onClick={() => setDeleteCourse(true)}
          className="rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold py-2 px-4"
        >
          <FontAwesomeIcon icon={faTrash} /> Borrar Curso/s
        </button>
        {deleteCourse && (
          <DeleteCourse
            isOpen={deleteCourse}
            setDeleteCourse={setDeleteCourse}
            getSelectedCourses={getSelectedCourses}
            idSelectedCourses={idSelectedCourses}
            setIdCourses={setIdCourses}
          />
        )}
      </div>
      <div className="flex">
        <div className="flex relative items-center max-w-full">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-0 pr-2 text-gray-400"
          />
          <input
            type="text"
            className="pl-6 px-9 text-center py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            placeholder="Ingrese curso a buscar"
            onChange={handleChange}
            value={courseSearched.course}
          />
        </div>
      </div>
    </div>
  );
};

export default NavCourses;
