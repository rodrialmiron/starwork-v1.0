import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass } from "../../../../redux/actions/adminActions";
import { disabledForSeconds } from "../../../../helpers/utils";

export const DeleteClass = ({ isOpen, setDeletedClass, clase }) => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.successAlerts);
  const [disabled,setDisabled] = useState(false)

  const handleDeleteClass = () => {
    disabledForSeconds(setDisabled)
    dispatch(deleteClass(clase.id));
  };
  const handleNo = () => {
    setDeletedClass(false);
  };

  useEffect(() => {
    if (success) {
      setDeletedClass(false);
    }
  }, [success]);

  return (
    <Modal
      isOpen={isOpen}
      className="absolute w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <section className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">
          <span>¿ESTAS SEGURO QUE DESEA ELIMINAR ESTA CLASE?</span>
        </div>

        <div className="flex justify-center mt-2 text-center border-b border-gray-600 dark:border-gray-300 w-full">
          <p className="mr-2">{clase.classTitle}</p>
          <p>-</p>
          <p className="ml-2">{clase.classContent}</p>
        </div>

        <section className="flex justify-center items-center mt-4 -mb-3">
          <button
            disabled={disabled}
            onClick={handleDeleteClass}
            className="ml-5 w-10 h-9 rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold"
          >
            SI
          </button>
          <button
            onClick={handleNo}
            className="ml-5 w-10 h-9 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold"
          >
            NO
          </button>
        </section>
      </section>
    </Modal>
  );
};
