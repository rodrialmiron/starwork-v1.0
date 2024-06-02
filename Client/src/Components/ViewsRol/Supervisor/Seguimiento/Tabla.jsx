import React, { useState, useEffect } from "react";

function getColor(progress) {
  if (progress < 30) return "bg-red-600";
  if (progress < 62) return "bg-yellow-400";
  if (progress < 68) return "bg-yellow-500";
  if (progress < 70) return "bg-green-500";
  if (progress < 80) return "bg-green-600";
  if (progress < 98) return "bg-green-700";
  return "bg-green-800";
}

const Tabla = ({ user }) => {
  const [viewAllUsers, setViewAllUsers] = useState(false);
  useEffect(() => {
    user.length === 0 ? setViewAllUsers(true) : setViewAllUsers(false);
  }, [user]);
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
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
        {!viewAllUsers ? (
          <tbody className="divide-y divide-gray-600 dark:divide-gray-200">
            {user.enrollments.map((course, index) => (
              <tr
                key={index}
                className="bg-gray-200 transition duration-300 dark:text-gray-100 dark:bg-gray-800"
              >
                <td className="pl-44 py-2">{course.courseName}</td>
                <td className="px-6 py-2">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Progress"
                    aria-valuenow={course.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className={`progress-bar rounded-sm text-center ${getColor(
                        course.progress
                      )}`}
                      style={{ width: `${course.progress}%` }}
                    >
                      {course.progress === 100
                        ? "COMPLETADO"
                        : `${course.progress}%`}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2 text-justify">
                  {course.classView + "/" + course.totalClass}
                </td>
                <td className="px-6 py-2">
                  {course.registerEnrollment.slice(0, 10)}
                </td>
                <td className="px-6 py-2">
                  {course.completionDate
                    ? course.completionDate.slice(0, 10)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded border-none dark:text-white">
              NO SE ENCUENTRAN USUARIOS DISPONIBLES
              <hr className="border-custom-blue mt-2" />
            </h1>
          </>
        )}
      </table>
    </>
  );
};

export default Tabla;
