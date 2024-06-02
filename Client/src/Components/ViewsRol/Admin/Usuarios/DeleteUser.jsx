import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers } from "../../../../redux/actions/adminActions";
import { SelectedUsers } from "./SelectedUsers";

export const DeleteUser = ({ 
  isOpen, 
  setDeleteUser, 
  getSelectedUsers, 
  idSelectedUsers,
  setSelectUSers }) => {
 
  const dispatch = useDispatch();

 const handleDelete = () => {
  idSelectedUsers.forEach((id) => {
   dispatch(deleteUsers(id));
  });
  setDeleteUser(false)
  setSelectUSers([])
 };

 return (
  <Modal
   isOpen={isOpen}
   className="absolute w-[700px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
   overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
  >
   {idSelectedUsers.length === 0 ? (
    <section className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>DEBE SELECCIONAR LOS USUARIOS QUE DESEA BORRAR</span>
     </div>
     
      <button
       className="ml-5 mt-2 -mb-4 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
       onClick={() => setDeleteUser(false)}
      >
       OK
      </button>
    </section>
   ) : (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>¿ESTAS SEGURO QUE DESEA ELIMINAR ESTOS USUARIOS?</span>
     </div>
     <div className="flex flex-col justify-center items-center space-y-4">
      {getSelectedUsers().map((user, index) => {
       return (
        <div key={index}
        className="mt-1 text-center border-b border-gray-600 dark:border-gray-300 w-full">
         <SelectedUsers user={user} />
        </div>
       );
      })}
     </div>

     <section className="flex justify-center mt-4 -mb-4">
      <button
       className="rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold py-1 px-2 h-8 w-10"
       onClick={handleDelete}
      >
       SI
      </button>
      <button
       className="ml-7 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold py-1 px-2 h-8 w-10"
       onClick={() => setDeleteUser(false)}
      >
       NO
      </button>
     </section>
    </div>
   )}
  </Modal>
 );
};
