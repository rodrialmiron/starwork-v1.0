import Modal from 'react-modal'
import { orderClass } from '../../../../redux/actions/adminActions';
import { useDispatch } from 'react-redux';

export const ChangeOrder = ({isOpen, openModal, clase, setChangeOrder}) => {
const dispatch = useDispatch()

    const handleOrder = () => {
        openModal(false)
        setChangeOrder(false)
        const idClasses = {
          reorderedClasses: clase.Classes.map((clas) => clas.id),
        };
        dispatch(orderClass(idClasses));
      };

    return(
        <Modal
        isOpen={isOpen}
        className="absolute w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
          <span>¿ESTAS SEGURO QUE DESEA CAMBIAR EL ORDEN?</span>
          <div className="flex justify-center">
          <button
            onClick={handleOrder}
            className="ml-5 w-10 h-9 rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold"
          >
            SI
          </button>
          <button
            onClick={() => openModal(false)}
            className="ml-5 w-10 h-9 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold"
          >
            NO
          </button>
          </div>
            </div>
        </Modal>
    )
}