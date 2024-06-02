import { useState, useEffect } from "react";
import Modal from "react-modal";
import Register from "../Register/Register.jsx";
import { useSelector } from "react-redux";

Modal.setAppElement("#root"); // Evita errores de accesibilidad

export default function RegisterButton() {
  const isVerified = useSelector((state) => state.user.isVerified);

  const isRegistered = useSelector((state) => state.user.isRegistered);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    if (!isRegistered || (isRegistered && isVerified)) {
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalIsOpen]);

  useEffect(() => {
    if (isVerified) {
      setModalIsOpen(false);
    }
  }, [isVerified]);

  return (
    <>
      {/* Boton para abrir el modal */}
      <button
        onClick={toggleModal}
        className="cursor-pointer font-bold bg-blue-900 text-white px-6 py-2 rounded-lg
    border-blue-600
      border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] transition duration-300 ease-in-out"
      >
        Regístrate
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Register"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
        shouldCloseOnOverlayClick={true}
      >
        <Register closeModal={closeModal} />
      </Modal>
    </>
  );
}