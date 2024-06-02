import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../../../redux/actions/adminActions";
import { SelectedUsers } from "./SelectedUsers";
import { useEffect, useState } from "react";
import { disabledForSeconds } from "../../../../helpers/utils";

export const ChangeStatusUser = ({
 changeStatusUser,
 setChangeStatusUser,
 getSelectedUsers,
 idSelectedUsers
}) => {

 const dispatch = useDispatch();
 const allUsers = useSelector((state) => state.admin.allUsers);
 const success = useSelector((state) => state.user.successAlerts);
 const [disabled,setDisabled] = useState(false)

 const handleChangeStatus = () => {
    disabledForSeconds(setDisabled)
  idSelectedUsers.forEach((id) => {
   const userToUpdate = allUsers.find((user) => user.id === id);
   dispatch(changeStatus({ id, status: !userToUpdate.status }));
  });
 };

 useEffect(() => {
  if (success) {
   setChangeStatusUser(false);
  }
 }, [success]);

 return (
  <Modal
   isOpen={changeStatusUser}
   className="absolute w-[700px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
   overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
  >
   {idSelectedUsers.length === 0 ? (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>DEBE SELECCIONAR LOS USUARIOS QUE DESEA HABILITAR/INHABILITAR</span>
     </div>
     <div>
      <button
       className="ml-5 mt-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
       onClick={() => setChangeStatusUser(false)}
      >
       OK
      </button>
     </div>
    </div>
   ) : (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>¿ESTAS SEGURO QUE DESEA HABILITAR/INHABILITAR ESTOS USUARIOS?</span>
     </div>

     <div className="flex flex-col justify-center items-center space-y-4">
      {getSelectedUsers().map((user, index) => {
       return (
        <div
         key={index}
         className="mt-1 text-center border-b border-gray-600 dark:border-gray-300 w-full"
        >
         <SelectedUsers user={user} changeStatusUser={changeStatusUser} />
        </div>
       );
      })}
     </div>

     <div className="flex justify-center mt-4 -mb-4">
      <button
      disabled={disabled}
       className="h-8 w-10 rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold py-1 px-2"
       onClick={handleChangeStatus}
      >
       SI
      </button>
      <button
       className="ml-5 h-8 w-10 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold py-1 px-2"
       onClick={() => setChangeStatusUser(false)}
      >
       NO
      </button>
     </div>
    </div>
   )}
  </Modal>
 );
};
