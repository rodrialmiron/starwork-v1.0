import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  modifyProfile,
} from "../../../../redux/actions/userActions";
import useToast from "../../../../Hooks/useToast";
import {
  setSucessAlerts,
  setErrorAlerts,
} from "../../../../redux/slices/userSlice";
import useError from "../../../../Hooks/useError";
import MostrarRol from "../../MostrarRol/MostrarRol";

const Cuenta = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userProfile);
  const success = useSelector((state) => state.user.successAlerts);
  const error = useSelector((state) => state.user.errorAlerts);
  const { successAlert, errorAlert } = useToast();

  const [userProfile, setUserProfile] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    company: "",
    position: "",
    sector: "",
    email: "",
    role: "",
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    setUserProfile({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      company: user.company,
      position: user.position,
      sector: user.sector,
      email: user.email,
      role: user.id_role,
    });
  }, [user]);

  useEffect(() => {
    if (error) {
      setEdit(true);
    }
    dispatch(setErrorAlerts(""));
  }, [error]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleChange = ({ target }) => {
    setUserProfile({
      ...userProfile,
      [target.name]: target.value,
    });
  };

  const handleCancel = () => {
    setEdit(false);
    dispatch(getUserProfile());
  };

  const handleConfirm = () => {
    dispatch(modifyProfile(userProfile));
    setEdit(false);
  };

  return (
    <>
      <nav>
        <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
          CUENTA
          <MostrarRol />
        </h1>
      </nav>

      {!edit && (
        <div className="flex justify-end absolute right-0 p-2">
          <button
            className="font-semibold bg-custom-blue text-white px-6 py-2 rounded-lg
    border-blue-200
      border-b-[4px] hover:bg-custom-blueOscuro hover:border-blue-300 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] transition duration-300 ease-in-out"
            onClick={handleEdit}
          >
            EDITAR
          </button>
        </div>
      )}

      <section className="flex justify-center items-center p-8">
        <div className="flex flex-col justify-between space-y-4 dark:text-gray-200">
          <h1 className="flex justify-center items-center text-xl font-bold underline">
            PERFIL
          </h1>
          <div className="flex items-center justify-between space-x-2">
            <label className="font-bold underline" htmlFor="">
              NOMBRE/S:
            </label>
            <input
              type="text"
              className={
                !edit
                  ? "cursor-not-allowed px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200"
                  : "px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              }
              readOnly={!edit}
              name="firstName"
              onChange={handleChange}
              value={userProfile.firstName}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <label className="font-bold underline" htmlFor="">
              APELLIDO/S:
            </label>
            <input
              type="text"
              className={
                !edit
                  ? "cursor-not-allowed px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200"
                  : "px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              }
              readOnly={!edit}
              name="lastName"
              onChange={handleChange}
              value={userProfile.lastName}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <label className="font-bold underline" htmlFor="">
              TELÉFONO:
            </label>
            <input
              type="text"
              className={
                !edit
                  ? "cursor-not-allowed px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200"
                  : "px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              }
              readOnly={!edit}
              name="phoneNumber"
              onChange={handleChange}
              value={userProfile.phoneNumber}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <label className="font-bold underline" htmlFor="">
              EMPRESA:
            </label>
            <input
              type="text"
              name="company"
              className={
                !edit
                  ? "cursor-not-allowed px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200"
                  : "px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              }
              value={userProfile.company}
              onChange={handleChange}
              readOnly={!edit}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <label className="font-bold underline" htmlFor="">
              CARGO:
            </label>
            <input
              type="text"
              className={
                !edit
                  ? "cursor-not-allowed px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200"
                  : "px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              }
              readOnly={!edit}
              name="position"
              onChange={handleChange}
              value={userProfile.position}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <label className="font-bold underline" htmlFor="">
              SECTOR AREA:
            </label>
            <input
              type="text"
              className={
                !edit
                  ? "cursor-not-allowed px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-500 transition duration-200"
                  : "px-3 py-2 font-semibold leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700 dark:border-gray-900 dark:text-white"
              }
              readOnly={!edit}
              onChange={handleChange}
              name="sector"
              value={userProfile.sector}
            />
          </div>
          <div>
            {userProfile.role === 1 && (
              <span className="bg-green-900 ml-20 text-white font-semibold rounded-md px-2 py-1">
                ROL DE ADMINISTRADOR
              </span>
            )}
            {userProfile.role === 2 && (
              <span className="bg-green-900 ml-20 text-white font-semibold rounded-md px-2 py-1">
                ROL DE SUPERVISOR
              </span>
            )}
            {userProfile.role === 3 && (
              <span className="bg-green-900 ml-20 text-white font-semibold rounded-md px-2 py-1">
                ROL DE COLABORADOR
              </span>
            )}
          </div>
        </div>
      </section>
      {edit && (
        <div className="flex justify-center items-center p-2">
          <button
            className="font-semibold mr-4 bg-green-500 text-white px-6 py-2 rounded-lg
    border-green-300
      border-b-[4px] hover:bg-green-700 hover:border-green-500 hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] transition duration-300 ease-in-out"
            onClick={handleConfirm}
          >
            CONFIRMAR
          </button>
          <button
            className="font-semibold bg-red-500 text-white px-6 py-2 rounded-lg
    border-red-300
      border-b-[4px] hover:bg-red-700 hover:border-red-500 hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] transition duration-300 ease-in-out"
            onClick={handleCancel}
          >
            CANCELAR
          </button>
        </div>
      )}
    </>
  );
};

export default Cuenta;
