//?REACT
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHouse } from "@fortawesome/free-solid-svg-icons";

//?COMPONENTES
import ModalClases from "./ModalClases/ModalClases";
import Loader from "../../Loader/Loader";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/viewcourses");
        setCourses(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = (index) => {
    setSelectedCourse(selectedCourse === index ? 0 : index);
    setModalIsOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <header className="flex flex-col min-h-screen bg-gray-300 w-full ">
      <section>
        <h1 className="text-4xl uppercase text-center font-bold text-custom-blue mt-2 mb-3">
          Nuestros cursos
        </h1>

        <div className="absolute top-3 right-32">
          <Link to="/">
            <button className="w-10 h-9 rounded-lg bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold">
              <FontAwesomeIcon icon={faHouse} size="lg" />
            </button>
          </Link>
        </div>
      </section>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-custom-blueOscuro2 text-white uppercase">
            <th className="px-4 py-2">Nombre Curso</th>
            <th className="px-4 py-2">Tema</th>
            <th className="px-4 py-2">Descripcion</th>
            <th className="px-4 py-2">Ver Clases</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <React.Fragment key={index}>
              <tr
                className={
                  index % 2 === 0
                    ? "bg-custom-blueTable"
                    : "bg-custom-blueTable2"
                }
              >
                <td className="border px-4 py-2">{course.courseName}</td>
                <td className="border px-4 py-2">{course.topic}</td>
                <td className="border px-4 py-2">{course.description}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center">
                    <FontAwesomeIcon
                      className=" cursor-pointer"
                      icon={faEye}
                      style={{ color: "#032a3b" }}
                      onClick={() => handleCourseClick(index)}
                    />
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div>
        <ModalClases
          courses={courses}
          selectedCourse={selectedCourse}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
    </header>
  );
};

export default ViewCourses;
