import React, { useState, useEffect } from "react";
import fecha from "./fecha";

function getColor(progress) {
  if (progress < 30) return "bg-red-600";
  if (progress < 60) return "bg-yellow-400";
  if (progress < 70) return "bg-yellow-500";
  if (progress < 80) return "bg-green-500";
  if (progress < 90) return "bg-green-600";
  if (progress < 100) return "bg-green-700";
  return "bg-green-800";
}

const Tabla = ({ courses }) => {
  const [viewClasses, setViewClasses] = useState(false);
  useEffect(() => {
    courses.length === 0 ? setViewClasses(true) : setViewClasses(false);
  }, [courses]);
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
              PROGRESO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              NUMERO DE CLASE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              MATRICULADO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              FECHA DE FINALIZACION
            </th>
          </tr>
        </thead>
        {!viewClasses ? (
          <tbody className="bg-white divide-y divide-gray-800 dark:divide-gray-200">
            {courses.map((course, index) => (
              <tr
                key={index}
                className="bg-gray-200 transition duration-300 dark:text-gray-100 dark:bg-gray-800"
              >
                <td className="pl-44 py-2"> {course.courseName} </td>
                <td className="px-6 py-2">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Progress"
                    aria-valuenow={course.Enrollment.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className={`progress-bar rounded-sm text-center ${getColor(
                        course.Enrollment.progress
                      )}`}
                      style={{ width: `${course.Enrollment.progress}%` }}
                    >
                      {course.Enrollment.progress === 100
                        ? "COMPLETADO"
                        : `${course.Enrollment.progress}%`}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  {course.Enrollment.classView}/{course.Enrollment.totalClass}
                </td>
                <td className="px-6 py-2">
                  {" "}
                  {fecha(course.Enrollment.createdAt)}
                </td>
                <td className="px-6 py-2">
                  {course.Enrollment.completionDate === null
                    ? "-"
                    : course.Enrollment.completionDate}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none p-5 rounded dark:text-white">
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
