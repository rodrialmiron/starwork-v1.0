import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

const ModalClases = ({
  courses,
  selectedCourse,
  modalIsOpen,
  setModalIsOpen,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      shouldCloseOnOverlayClick={false}
      className="absolute w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 justify-center items-center"
    >
      {selectedCourse !== null && (
        <section className="p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
          <div className="flex flex-col justify-end items-end -mt-3 -mr-3">
            <button
              className="w-10 h-9 rounded-lg bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold"
              onClick={() => setModalIsOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {courses[selectedCourse].courseName}
          </h2>
          <ul>
            {courses[selectedCourse].Classes.map((lesson, lessonIndex) => (
              <ul key={lessonIndex} className="text-gray-900 font-semibold">
                {lesson.classNumber}: {lesson.classTitle}
              </ul>
            ))}
          </ul>
        </section>
      )}
    </Modal>
  );
};

export default ModalClases;
