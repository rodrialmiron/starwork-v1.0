import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditClass } from "./EditClass";
import { ChangeStatusClass } from "./ChangeStatusClass";
import { DeleteClass } from "./DeleteClass";

export const DetailClass = ({ clase, idCourse, changeOrderState }) => {
  const { role } = JSON.parse(localStorage.getItem("user"));

  const [edit, setEdit] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [deletedClass, setDeletedClass] = useState(false);

  return (
    <div
      className={`border-gray-600 border p-6 bg-gray-100 rounded-lg ${
        !clase.status
          ? "opacity-60 cursor-not-allowed dark:bg-gray-700"
          : "dark:bg-gray-800"
      }`}
    >
      <div className="flex items-center">
        <label className="text-lg mr-2 font-bold"></label>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {clase.status
            ? "CLASE " +
              clase.classNumber +
              " - " +
              clase.classTitle.toUpperCase()
            : "CLASE " + " - " + clase.classTitle.toUpperCase()}
        </h1>
      </div>

      <div className="flex items-center dark:text-gray-200">
        <label className="mr-2 font-bold">Estado: </label>
        <p
          className={`font-semibold text-lg ${
            clase.status ? "text-green-600" : "text-red-600"
          }`}
        >
          {clase.status ? "Habilitada" : "Inhabilitada"}
        </p>
      </div>

      {role == 1 ? (
        <div className="flex items-center dark:text-gray-200">
          <label className="mr-2 font-bold">Link:</label>
          <a
            href={clase.link}
            target="_blank"
            className="text-blue-600 dark:text-blue-400"
          >
            {clase.link}
          </a>
        </div>
      ) : (
        ""
      )}
      {role == 3 ? (
        <div className="flex items-center dark:text-gray-200">
          <label className="mr-2 font-bold">Link:</label>
          <a
            href={clase.link}
            target="_blank"
            className="text-blue-600 dark:text-blue-400"
          >
            {clase.link}
          </a>
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center dark:text-gray-200">
        <label className="mr-2 font-bold">Mensaje: </label>
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          {clase.menssage}
        </p>
      </div>

      <div className="flex items-center dark:text-gray-200">
        <label className="mr-2 font-bold">Contenido: </label>
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          {clase.classContent}
        </p>
      </div>
      {role == 1 ? (
        <div>
          <div className="flex justify-end">
            {clase.status === true ? (
              <button
                className="ml-5 mt-2 text-white rounded-md bg-red-500 hover:bg-red-700 transition duration-200 font-semibold -py-1 px-2"
                onClick={() => setChangeStatus(true)}
              >
                INHABILITAR
              </button>
            ) : (
              <button
                className="opacity-100 ml-5 mt-2 text-white rounded-md bg-green-500 hover:bg-green-700 transition duration-200 font-semibold -py-1 px-2"
                onClick={() => setChangeStatus(true)}
              >
                HABILITAR
              </button>
            )}
            <button
              title="Editar Clase"
              className="ml-5 mt-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
              onClick={() => setEdit(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              title="Eliminar Clase"
              className="ml-5 mt-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
              onClick={() => setDeletedClass(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <EditClass
          isOpen={edit}
          setEdit={setEdit}
          clase={clase}
          idClass={clase.id}
          idCourse={idCourse}
        />
      </div>
      <div>
        <ChangeStatusClass
          status={clase.status}
          id={clase.id}
          isOpen={changeStatus}
          setChangeStatus={setChangeStatus}
          clas={clase}
        />
      </div>
      <div>
        <DeleteClass
          isOpen={deletedClass}
          setDeletedClass={setDeletedClass}
          clase={clase}
        />
      </div>
    </div>
  );
};
