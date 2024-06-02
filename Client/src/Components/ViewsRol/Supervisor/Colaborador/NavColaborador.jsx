import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faUserPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

//?COMPONENTES
import useHandleChange from "../../../../Hooks/useHandleChange";
import {
  searchUser,
  getAllUsers,
} from "../../../../redux/actions/supervisorActions";
import Assign from "./Assign";
import Delete from "./Delete";
import AñadirColaborador from "./AñadirColaborador";
import Confirm from "./Confirm";

function NavColaborador({ selectUsers, setSelectUsers }) {
  const [isOpenModalAdd, setOpenModalAdd] = useState(false);
  const [isOpenModalAssing, setIsOpenModalAssing] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });
  const handleChange = useHandleChange(input, setInput);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [isOpenModalAdd]);

  useEffect(() => {
    if (isOpenModalAdd || isOpenModalAssing || isOpenDelete || isOpenConfirm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpenModalAdd, isOpenModalAssing, isOpenDelete, isOpenConfirm]);

  useEffect(() => {
    if (input.name) dispatch(searchUser(input.name));
    else dispatch(getAllUsers());
  }, [input.name]);

  return (
    <>
      <nav className="flex justify-between px-16 py-2 h-full">
        <div>
          <button
            className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4"
            onClick={() => setOpenModalAdd(!isOpenModalAdd)}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Añadir Colaborador
          </button>
          <Modal
            isOpen={isOpenModalAdd}
            onRequestClose={() => setOpenModalAdd(!isOpenModalAdd)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded"
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
            shouldCloseOnOverlayClick={true}
          >
            <AñadirColaborador setOpenModalAdd={setOpenModalAdd} />
          </Modal>
        </div>
        <div>
          <button
            className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4"
            onClick={() => setOpenConfirm(!isOpenConfirm)}
          >
            <FontAwesomeIcon icon={faPlus} /> Asignar
          </button>

          <Modal
            isOpen={isOpenConfirm}
            onRequestClose={() => setOpenConfirm(!isOpenConfirm)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded"
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
          >
            {selectUsers.length == 0 ? (
              <Confirm
                setOpenConfirm={setOpenConfirm}
                selectUsers={selectUsers}
              />
            ) : (
              <Assign
                setOpenConfirm={setOpenConfirm}
                selectUsers={selectUsers}
              />
            )}
          </Modal>
        </div>
        <div>
          <button
            className="bg-red-600 hover:bg-red-800 rounded-md transition duration-200 text-white font-bold py-2 px-4 "
            onClick={() => setIsOpenDelete(!isOpenDelete)}
          >
            <FontAwesomeIcon icon={faTrash} /> Borrar
          </button>
          <Modal
            isOpen={isOpenDelete}
            onRequestClose={() => setIsOpenDelete(!isOpenDelete)}
            className="absolute w-[700px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
          >
            <Delete
              selectUsers={selectUsers}
              setSelectUsers={setSelectUsers}
              setIsOpenDelete={setIsOpenDelete}
              setInput={setInput}
            />
          </Modal>
        </div>
        <div className="flex relative items-center max-w-full">
          <input
            type="text"
            className="px-10 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
            placeholder="Ingrese el usuario a buscar"
            value={input.name}
            onChange={handleChange}
            name="name"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-0 pr-2 text-gray-400"
          />
        </div>
      </nav>
    </>
  );
}

export default NavColaborador;
