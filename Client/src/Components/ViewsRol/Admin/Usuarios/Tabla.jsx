import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../../../redux/slices/adminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ModifiedLimitSlot } from "./ModifiedLimitSlot";

const Tabla = ({ users, handleCheck }) => {
  const allUsers = useSelector((state) => state.admin.allUsers);
  const [modifiedSlot, setModifiedSlot] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [limitSlotUser, setLimitSlotUSer] = useState(0);
  const [usedSlotUser, setUsedSlotUser] = useState(0);

  const handleIdUser = (id, limitSlot, usedSlot) => {
    setIdUser(id);
    setLimitSlotUSer(limitSlot);
    setUsedSlotUser(usedSlot);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-600 dark:divide-gray-200">
        <thead className="bg-custom-blue">
          <tr>
            <th
              scope="col"
              className="pl-44 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Nombre Completo
            </th>
            <th
              scope="col"
              className="px-6 py-1 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Empresa
            </th>
            <th
              scope="col"
              className="px-6 py-1 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Rol
            </th>
            <th
              scope="col"
              className="px-6 py-1 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Código de Invitación
            </th>
            <th
              scope="col"
              className="px-6 py-1 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-1 max-w-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              INVITACIONES EN USO / CANTIDAD DISPONIBLE
            </th>
            <th
              scope="col"
              className="px-6 py-1 max-w-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              MARQUE UNO/VARIOS
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-600 dark:divide-gray-200">
          {allUsers.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={index}
                className="bg-gray-200 transition duration-300 dark:text-gray-100 dark:bg-gray-800"
              >
                <td className="pl-44 py-2">
                  {user.lastName} {user.firstName}
                </td>
                <td className="px-6 py-2">{user.company}</td>
                <td className="px-6 py-2">
                  {user.roleName === "Supervisor" && "Supervisor"}
                  {user.roleName === "Admin" && "Administrador"}
                  {user.roleName === "Collaborator" && "Colaborador"}
                </td>
                <td className="px-6 py-2">{user.code}</td>
                <td
                  className={`px-6 py-2 font-semibold text-lg ${
                    user.status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.status === true ? "Habilitado" : "Inhabilitado"}
                </td>
                <td className="px-11 py-2">
                  {user.usedSlot + " / " + user.limitSlot}
                  <button
                    onClick={() => {
                      setModifiedSlot(true);
                      handleIdUser(user.id, user.limitSlot, user.usedSlot);
                    }}
                    className="ml-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold px-1"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
                <td className="px-6 py-2 flex justify-center">
                  <label key={user.id}>
                    <input
                      className="mt-5 mr-8"
                      type="checkbox"
                      value={user.id}
                      onChange={handleCheck}
                    />
                  </label>
                </td>
              </tr>
            ))
          ) : (
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded dark:text-white">
              NO SE HAN ENCONTRADO USUARIOS
              <hr className="border-custom-blue mt-2" />
            </h1>
          )}
        </tbody>
      </table>

      <div>
        <ModifiedLimitSlot
          isOpen={modifiedSlot}
          setModifiedSlot={setModifiedSlot}
          idUser={idUser}
          limitSlotUser={limitSlotUser}
          usedSlotUser={usedSlotUser}
        />
      </div>
    </div>
  );
};

export default Tabla;
