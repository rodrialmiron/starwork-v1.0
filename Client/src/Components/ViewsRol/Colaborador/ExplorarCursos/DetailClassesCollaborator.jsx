import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DetailClass } from "../../Admin/Courses/DetailClass";

const DetailClassesCollaborator = ({ classes, setIsOpen }) => {
  return (
    <>
      <div className="w-[800px] min-h-[400px] p-2 bg-gray-200 rounded-xl shadow-md dark:bg-gray-800">
        <h2 className="dark:text-white text-2xl flex justify-center">CLASES</h2>
        <div className="flex justify-end">
          <button
            title="Cerrar"
            onClick={setIsOpen}
            className="text-gray-100 mr-8 -mt-10 rounded-md bg-red-500 hover:bg-red-700 transition duration-200 font-semibold -py-1 px-2"
          >
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>
        {classes && (
          <div className="mt-4 pr-2 overflow-auto max-h-[400px]">
            {classes.map((clas, index) => (
              <div
                key={index}
                className="mb-5 rounded-lg items-center bg-gray-200"
              >
                <DetailClass clase={clas} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailClassesCollaborator;
