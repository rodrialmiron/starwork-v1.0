import React, { useEffect, useState } from "react";

function Tabla({ allUsers, handleCheck }) {
  const [viewAllUsers, setViewAllUsers] = useState(false);
  useEffect(() => {
    allUsers.length === 0 ? setViewAllUsers(true) : setViewAllUsers(false);
  }, [allUsers]);
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-custom-blue">
          <tr>
            <th
              scope="col"
              className="pl-44 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              NOMBRE COMPLETO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              CARGO
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              SECTOR/AREA
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              TELEFONO
            </th>
            <th
              scope="col"
              className="px-6 py-3 max-w-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              MARQUE UNO/VARIOS
            </th>
          </tr>
        </thead>
        {!viewAllUsers ? (
          <tbody className="bg-white divide-y divide-gray-600 dark:divide-gray-200">
            {allUsers?.map((user, index) => (
              <tr
                key={index}
                className="bg-gray-200 transition duration-300 dark:text-gray-100 dark:bg-gray-800"
              >
                <td className="pl-44 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-2">{user.position}</td>
                <td className="px-6 py-2">{user.sector}</td>
                <td className="px-6 py-2">{user.phoneNumber}</td>
                <td className="px-6 py-2 flex justify-center">
                  <label key={user.id}>
                    <input
                      type="checkbox"
                      value={user.id}
                      onChange={handleCheck}
                    />
                  </label>
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
}

export default Tabla;
