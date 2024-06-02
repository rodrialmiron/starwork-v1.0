import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { modifiedLimitSlot } from "../../../../redux/actions/adminActions";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export const ModifiedLimitSlot = ({
  isOpen,
  setModifiedSlot,
  idUser,
  limitSlotUser,
  usedSlotUser,
}) => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.successAlerts);
  const [limitSlot, setLimitSlot] = useState(0);
  const [errorAlert, setErrorAlert] = useState("");

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

  const handleChange = ({ target }) => {
    if (target.value !== "" && target.value < usedSlotUser) {
      setErrorAlert(
        "No puede poner un límite menor a la cantidad de invitaciones utilizadas"
      );
      setLimitSlot(target.value);
    } else {
      setLimitSlot(target.value);
      setErrorAlert("");
    }
  };

  const handleIncrease = () => {
    setLimitSlot(Number(limitSlot) + 1);
  };

  useEffect(() => {
    if (limitSlot >= usedSlotUser) {
      setErrorAlert("");
    } else {
      setErrorAlert(
        "No puede poner un límite menor a la cantidad de invitaciones utilizadas"
      );
    }
  }, [limitSlot]);

  const handleDecrease = () => {
    if (limitSlot > usedSlotUser) {
      setLimitSlot(limitSlot - 1);
    } else {
      setErrorAlert(
        "No puede poner un límite menor a la cantidad de invitaciones utilizadas"
      );
    }
  };

  const handleModifiedLimitSlot = () => {
    if (!errorAlert && limitSlot >= usedSlotUser) {
      setErrorAlert("");
      dispatch(
        modifiedLimitSlot({
          id: idUser,
          limitSlot: Number(limitSlot),
        })
      );
    } else {
      setErrorAlert(
        "No puede poner un límite menor a la cantidad de invitaciones utilizadas"
      );
    }
  };

  useEffect(() => {
    setLimitSlot(limitSlotUser);
    setErrorAlert("");
  }, [isOpen]);

  useEffect(() => {
    if (success) {
      setModifiedSlot(false);
    }
  }, [success]);

  return (
    <Modal
      isOpen={isOpen}
      className="absolute w-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <section className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800">
        <label className="flex justify-center text-center dark:text-white uppercase font-semibold">
          Editar cantidad de invitaciones disponibles
        </label>
        <div className="flex items-center justify-center ml-8">
          <input
            type="text"
            readOnly={true}
            name="limitCode"
            onChange={handleChange}
            value={usedSlotUser}
            className="ml-2 mt-2 w-14 text-center rounded-lg dark:text-white bg-gray-600"
          ></input>
          <p className="mx-2 mt-2 font-bold dark:text-white">/</p>
          <input
            type="text"
            name="limitSlot"
            onChange={handleChange}
            value={limitSlot}
            className="mt-2 mr-2 w-14 text-center rounded-lg"
          ></input>

          <section>
            <button
              onClick={handleIncrease}
              className="mt-2 h-8 w-8 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              disabled={errorAlert}
              onClick={handleDecrease}
              className={`mt-2 h-8 w-8 rounded-md bg-custom-blue text-white font-bold py-1 px-2 
       ${
         errorAlert
           ? "opacity-50"
           : "hover:bg-custom-blueOscuro transition duration-200"
       }`}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </section>
        </div>

        <span className="flex text-center dark:text-white">
          {errorAlert && errorAlert}
        </span>

        <div className="flex justify-center mt-3 -mb-3">
          <button
            onClick={handleModifiedLimitSlot}
            className="ml-1 rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold py-1 px-2"
          >
            GUARDAR
          </button>

          <button
            onClick={() => setModifiedSlot(false)}
            className="ml-5 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold py-1 px-2"
          >
            CANCELAR
          </button>
        </div>
      </section>
    </Modal>
  );
};
