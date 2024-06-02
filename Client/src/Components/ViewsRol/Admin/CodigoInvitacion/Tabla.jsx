import React from "react";

const Tabla = ({ invitationCodes }) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-custom-blue">
          <tr>
            <th
              scope="col"
              className="pl-72 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Nro de Codigo
            </th>
            <th
              scope="col"
              className="px-16 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Fecha de Creacion
            </th>
            <th
              scope="col"
              className="px-24 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              En uso
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {invitationCodes.length > 0 ? (
            invitationCodes.map((code, index) => (
              <tr
                key={index}
                className="bg-gray-200 transition duration-300 dark:text-gray-100 dark:bg-gray-800"
              >
                <td className="pl-64 py-2">{code.code}</td>
                <td className="px-20 py-2">{code.createdAt}</td>
                <td className="px-28 py-2">
                  {code.usedCode === 0 ? "NO" : "SI"}
                </td>
              </tr>
            ))
          ) : (
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded dark:text-white">
              AÚN NO HAY CÓDIGOS CREADOS
              <hr className="border-custom-blue mt-2" />
            </h1>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Tabla;
