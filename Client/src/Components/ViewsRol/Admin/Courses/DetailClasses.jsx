import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { DetailClass } from "./DetailClass";
import AddClasses from "./AddClasses";

Modal.setAppElement("#root");

//?Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { orderClass } from "../../../../redux/actions/adminActions";
import { setClasses } from "../../../../redux/slices/adminSlice";
import { ChangeOrder } from "./ChangeOrder";

export const DetailClasses = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const clas = useSelector((state) => state.admin.allClasses);
  const idCourse = clas.id;
  const [clase, setClase] = useState(clas);

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

  const [addClass, setAddClass] = useState(false);

  const [alertChangeOrder, setAlertChangeOrder] = useState(false);

  const handleAdd = () => {
    setAddClass(true);
  };

  useEffect(() => {
    setClase(clas);
  }, [clas]);

  const [draggingIndex, setDraggingIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDrop = (status) => {
    const newClasses = [...clase.Classes];
    
    if (
      draggingIndex !== null &&
      overIndex !== null &&
      draggingIndex !== overIndex &&
      status
    ) {
      const itemMoved = newClasses[draggingIndex];
      const replacedItem = newClasses[overIndex];

      newClasses.splice(overIndex, 1, {
        ...itemMoved,
        classNumber: overIndex + 1,
      });
      newClasses.splice(draggingIndex, 1, {
        ...replacedItem,
        classNumber: draggingIndex + 1,
      });
    }

    const updatedClases = newClasses.map((clase, index) => ({
      ...clase,
      classNumber: index + 1,
    }));

    setClase({ ...clase, Classes: updatedClases });
    setOverIndex(null);
    setDraggingIndex(null);
  };
  const [changeOrder, setChangeOrder] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <div className="w-[800px] min-h-[400px] p-2 bg-gray-200 rounded-xl shadow-md dark:bg-gray-800">
        <h2 className="dark:text-white text-2xl flex justify-center">CLASES</h2>
        <div className="flex justify-end space-x-[10px]">
          {changeOrder ? (
            <div className="flex justify-center items-center space-x-5">
              <span className="dark:text-white">
                ARRASTRE LAS CLASES PARA CAMBIAR EL ORDEN
              </span>
              <button
                className="rounded-md bg-red-500 hover:bg-red-700 transition duration-200 text-white font-bold py-2 px-4 "
                onClick={() => {
                  dispatch(setClasses(idCourse));
                  setChangeOrder(false);
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="">
              <button
                className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4 "
                onClick={handleAdd}
              >
                Agregar Clase
              </button>
            </div>
          )}
          <div className="">
            <button
              className={`rounded-md ${
                changeOrder
                  ? "bg-green-500 hover:bg-green-700"
                  : "bg-custom-blue hover:bg-custom-blueOscuro"
              } transition duration-200 text-white font-bold py-2 px-4`}
              onClick={() =>
                changeOrder ? setAlertChangeOrder(true) : setChangeOrder(true)
              }
            >
              {changeOrder ? "Guardar Orden" : "Cambiar Orden"}
            </button>
          </div>

          <div className="flex justify-end ">
            <button
              title="Cerrar"
              onClick={() => {
                onClose();
                setChangeOrder(false);
              }}
              className="text-gray-100 rounded-md bg-red-500 hover:bg-red-700 transition duration-200 font-semibold -py-1 px-2"
            >
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </button>
          </div>
        </div>

        {addClass && (
          <div>
            <AddClasses setAddClass={setAddClass} idCourse={idCourse} />
          </div>
        )}

        {(clase.Classes && !clase.Classes.length) ||
        (!clase.Classes && !addClass) ? (
          <h1 className="text-3xl dark:text-white text-center mt-24">
            No hay ninguna clase todavía
          </h1>
        ) : (
          ""
        )}
        {clase.Classes && (
          <div className="mt-4 pr-2 overflow-auto max-h-[400px]">
            {clase.Classes.map((clas, index) => (
              <div
                key={index}
                className={
                  changeOrder
                    ? "hover:cursor-grab active:cursor-grabbing mb-5 rounded-lg items-center bg-gray-200"
                    : "mb-5 rounded-lg items-center bg-gray-200"
                }
                {...(changeOrder === true ? { draggable: "true" } : {})}
                onDragStart={(event) => {
                  if (clas.status && changeOrder) {
                    setDraggingIndex(index);
                  } else {
                    event.stopPropagation();
                  }
                }}
                onDragOver={(event) => {
                  if (clas.status && changeOrder) {
                    setOverIndex(index);
                    event.preventDefault();
                  } else {
                    event.stopPropagation();
                  }
                }}
                onDrop={(event) => {
                  if (clas.status && changeOrder) {
                    handleDrop(clas.status);
                  } else {
                    event.stopPropagation();
                  }
                }}
              >
                <DetailClass clase={clas} index={index} idCourse={idCourse} />
              </div>
            ))}
          </div>
        )}
        <ChangeOrder
          isOpen={alertChangeOrder}
          openModal={setAlertChangeOrder}
          clase={clase}
          setChangeOrder={setChangeOrder}
        />
      </div>
    </Modal>
  );
};
