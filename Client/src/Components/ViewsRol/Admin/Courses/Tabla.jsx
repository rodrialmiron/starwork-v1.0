import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { DetailClasses } from "./DetailClasses";
import { setClasses, setSelected } from "../../../../redux/slices/adminSlice";
import { EditCourse } from "./EditCourse";

const Tabla = ({ handleCheck }) => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.admin.allCourses);

  const [allCourses, setAllCourses] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [editCourse, setEditCourse] = useState(false);

  const handleDetail = (id) => {
    setOpenDetail(true);
    dispatch(setClasses(id));
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  useEffect(() => {
    setAllCourses(courses);
  }, [courses]);

  return (
    <div>
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
              DESCRIPCION
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              DETALLE DE CLASES
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              ESTADO DEL CURSO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              EDITAR CURSO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              MARQUE UNO/VARIOS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white  divide-y divide-gray-800 dark:divide-gray-200">
          {allCourses ? (
            allCourses.map((course) => (
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
                <td className="px-6 py-2">
                  <button
                    title="Detalle de Curso"
                    className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
                    onClick={() => handleDetail(course.id)}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                  </button>
                  <div>
                    <DetailClasses
                      isOpen={openDetail}
                      onClose={handleCloseDetail}
                      idCourse={course.id}
                    />
                  </div>
                </td>
                <td
                  className={`px-6 py-2 font-semibold text-lg ${
                    course.status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {course.status === true ? "Habilitado" : "Inhabilitado"}
                </td>
                <td className="px-2 py-2">
                  <button
                    title="Editar Curso"
                    className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
                    onClick={() => {
                      setEditCourse(true);
                      dispatch(setClasses(course.id));
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <div>
                    <EditCourse
                      isOpen={editCourse}
                      setEditCourse={setEditCourse}
                      course={course}
                    />
                  </div>
                </td>
                <td className="px-12 py-2 ">
                  <label key={course.id}>
                    <input
                      type="checkbox"
                      id={course.id}
                      value={course.id}
                      onChange={handleCheck}
                    />
                  </label>
                </td>
              </tr>
            ))
          ) : (
            <h1 className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded dark:text-white">
              NO SE HAN ENCONTRADO CURSOS
              <hr className="border-custom-blue mt-2" />
            </h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
