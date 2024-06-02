import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import DetailClassesSuper from "./DetailClassesSuper";
import Modal from "react-modal";

const Tabla = ({ allCourses }) => {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [viewAllUsers, setViewAllUsers] = useState(false);
  useEffect(() => {
    allCourses.length === 0 ? setViewAllUsers(true) : setViewAllUsers(false);
  }, [allCourses]);
  const handleDetail = (classes) => {
    setClasses(classes);
    setIsOpen(!isOpen);
  };

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

  return (
    <>
      <table className="min-w-full divide-y divide-gray-800 dark:divide-gray-200">
        <thead className="bg-custom-blue">
          <tr>
            <th
              scope="col"
              className="pl-44 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              NOMBRE DEL CURSO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              TEMA
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              DESCRIPCIÓN
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              DETALLE DE CLASES
            </th>
          </tr>
        </thead>
        {!viewAllUsers ? (
          <tbody className="bg-white divide-y divide-gray-800 dark:divide-gray-200">
            {allCourses.map((course) => {
              return (
                <tr
                  key={course.id}
                  className="bg-gray-200 transition duration-300 dark:text-gray-100 dark:bg-gray-800"
                >
                  <td className="pl-44 py-2">
                    {course.courseName.substring(0, 30)}
                  </td>
                  <td className="px-6 py-2">{course.topic.substring(0, 30)}</td>
                  <td className="px-6 py-2">
                    {course.description.length > 50
                      ? course.description.substring(0, 50) + "..."
                      : course.description}
                  </td>
                  <button
                    title="Detalle de Curso"
                    className="ml-5 mt-2 mb-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
                    onClick={() => handleDetail(course.Classes)}
                  >
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={() => setIsOpen(!isOpen)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
                      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center"
                    >
                      <DetailClassesSuper
                        setIsOpen={() => setIsOpen(!isOpen)}
                        classes={classes}
                      />
                    </Modal>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} />{" "}
                  </button>
                  <div></div>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded border-none dark:text-white">
              NO SE ENCUENTRAN CURSOS DISPONIBLES
              <hr className="border-custom-blue mt-2" />
            </h1>
          </>
        )}
      </table>
    </>
  );
};

export default Tabla;
