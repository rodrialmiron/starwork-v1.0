import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusClass } from "../../../../redux/actions/adminActions";
import { disabledForSeconds } from "../../../../helpers/utils";

export const ChangeStatusClass = ({
 status,
 isOpen,
 setChangeStatus,
 id,
 clas,
}) => {
 const dispatch = useDispatch();
 const success = useSelector((state) => state.user.successAlerts);
 const [disabled,setDisabled] = useState(false)

 const clase = {
  id,
  status: !status,
 };

 const handleNo = () => {
  setChangeStatus(false);
 };

 const handleChangeStatus = () => {
    disabledForSeconds(setDisabled)
  dispatch(changeStatusClass(clase));
 };

 useEffect(() => {
  if (success) {
   setChangeStatus(false);
  }
 }, [success]);

 return (
  <Modal
   isOpen={isOpen}
   className="absolute w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
   overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
  >
   <div className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
    <div className="flex flex-col justify-center items-center">
     <span>
      ¿ESTAS SEGURO QUE DESEA {status ? "INHABILITAR " : "HABILITAR "} LA CLASE?
     </span>
    </div>
    <div className="flex justify-center mt-2 text-center border-b border-gray-600 dark:border-gray-300 w-full">
     <p className="mr-2">{clas.classTitle}</p>
     <p>-</p>
     <p className="ml-2">{clas.classContent}</p>
    </div>

    <div className="flex justify-center items-center mt-2 -mb-3">
     <button
      disabled={disabled}
      onClick={handleChangeStatus}
      className="ml-5 mt-2 w-10 h-9 rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold"
     >
      SI
     </button>
     <button
      onClick={handleNo}
      className="ml-5 mt-2 w-10 h-9 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold"
     >
      NO
     </button>
    </div>
   </div>
  </Modal>
 );
};
