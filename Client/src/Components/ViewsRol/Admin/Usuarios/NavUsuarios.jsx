import React, { useEffect, useState } from "react";
import {
  changeStatus,
  deleteUsers,
  getUserByName,
} from "../../../../redux/actions/adminActions";
import { useSelector, useDispatch } from "react-redux";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteUser } from "./DeleteUser";
import { ChangeStatusUser } from "./ChangeStatusUser";
import { OrderBy } from "../../OrderBy/OrderBy";

const NavUsuarios = ({idSelectedUsers, setSelectUSers}) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.admin.allUsers);

  const [userSearched, setUserSearched] = useState({
    firstName: "",
  });

  const [deleteUser, setDeleteUser] = useState(false);
  const [changeStatusUser, setChangeStatusUser] = useState(false);
  const [errorSearch, setErrorSearch] = useState("")

  const handleChange = ({ target }) => {
    setUserSearched({
      ...userSearched,
      firstName: target.value,
    });
  };

  useEffect(() => {
    if (deleteUser || changeStatusUser) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [deleteUser, changeStatusUser]);

  useEffect(() => {
    dispatch(getUserByName(userSearched.firstName));
  }, [userSearched.firstName]);

  const getSelectedUsers = () => {
    let selectedUsers = [];
    idSelectedUsers.forEach((id) => {
      selectedUsers.push(...allUsers.filter((user) => user.id === id));
    });
    return selectedUsers;
  };

  useEffect(()=>{
    if(allUsers.length === 0){
      setErrorSearch("No se han encontrado usuarios")
    }

  }, [allUsers])

  return (
    <div className="w-full">
      <nav className="py-3 flex justify-evenly items-center dark:bg-gray-800">
        <OrderBy />

        <div>
          <button
            onClick={() => setChangeStatusUser(true)}
            className="rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-2 px-4"
          >
            Habilitar/Inhabilitar
          </button>
        </div>
        <div>
          <button
            className="rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold py-2 px-4"
            onClick={() => setDeleteUser(true)}
          >
            <FontAwesomeIcon icon={faTrash} /> Borrar Usuario
          </button>
        </div>

        <section className="flex">
          <div className="flex relative items-center max-w-full">
            <input
              type="text"
              className="px-10 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              value={userSearched.firstName}
              onChange={handleChange}
              placeholder="Ingrese el usuario a buscar"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-0 pr-2 text-gray-400"
            />
          </div>
        </section>

        <div>
          <DeleteUser
            isOpen={deleteUser}
            setDeleteUser={setDeleteUser}
            getSelectedUsers={getSelectedUsers}
            idSelectedUsers={idSelectedUsers}
            setSelectUSers={setSelectUSers}
          />
          <ChangeStatusUser
            changeStatusUser={changeStatusUser}
            setChangeStatusUser={setChangeStatusUser}
            getSelectedUsers={getSelectedUsers}
            idSelectedUsers={idSelectedUsers}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavUsuarios;
