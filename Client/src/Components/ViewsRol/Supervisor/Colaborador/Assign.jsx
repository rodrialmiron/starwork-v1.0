import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { disabledForSeconds, returnAuthToken } from "../../../../helpers/utils";
import { getAllCourses } from "../../../../redux/actions/supervisorActions";
import {
  setErrorAlerts,
  setSucessAlerts,
} from "../../../../redux/slices/userSlice";
import useError from "../../../../Hooks/useError";

function Assign({ setOpenConfirm, selectUsers }) {
  const allCourses = useSelector((state) => state.supervisor.allCourses);
  const dispatch = useDispatch();
  const successAlert = useSelector((state) => state.user.successAlert);
  const [disabled, setDisabled] = useState(false);

  const [form, setForm] = useState({
    id_course: "",
    hour: "",
    dayOfWeek: "",
  });

  const [error, setError] = useState({
    hour: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    validateForAssing({ ...form, [event.target.name]: event.target.value });
  };

  const validateForAssing = (state) => {
    if (!state.hour) setError({ ...error, hour: "Proporcione hora" });
    else {
      if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(state.hour))
        setError({ ...error, hour: "" });
      else
        setError({ ...error, hour: "Envie un horario valido, ejemplo 20:50" });
    }
  };

  useEffect(() => {
    dispatch(getAllCourses())
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    disabledForSeconds(setDisabled);
    if (error.hour) return;
    selectUsers.forEach((user) => {
      axios
        .post(
          "/user/supervisor/assingcourse",
          {
            ...form,
            id_user: parseInt(user),
            id_course: parseInt(form.id_course),
            dayOfWeek: parseInt(form.dayOfWeek),
          },
          returnAuthToken()
        )
        .then(({ data }) => {
          dispatch(setSucessAlerts(data.message));
          setOpenConfirm(false);
        })
        .catch((error) => {
          dispatch(setErrorAlerts(useError(error)));
        });
    });
  };

  return (
    <div className="w-[700px] p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800">
      <div className="flex justify-center">
        <h1 className="text-2xl dark:text-white uppercase mb-2 -mt-3">
          Asignar
        </h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-y-2">
            <select
              id="id-course"
              name="id_course"
              onChange={handleChange}
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 py-3 dark:bg-gray-700 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            >
              <option value="course" disabled selected>
                Cursos
              </option>
              {allCourses.map((course) => {
                return (
                  <option
                    value={course.id}
                    key={course.id}
                    name={course.courseName}
                  >
                    {course.courseName}{" "}
                  </option>
                );
              })}
            </select>
            <div className="flex flex-col w-full items-center gap-y-4">
              <select
                name="dayOfWeek"
                id="dayOfWeek"
                className="mt-3 w-3/4 py-2 leading-tight text-gray-700 border-2 border-gray-300 rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                onChange={handleChange}
              >
                <option value={null} hidden>
                  Proporcione el dia de envio
                </option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miercoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sabado</option>
                <option value="0">Domingo</option>
              </select>
              <div className="flex">
                <input
                  type="time"
                  id="time"
                  name="hour"
                  className="rounded-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={form.hour}
                  onChange={handleChange}
                  required
                />
              </div>
              <span className="text-red-600 font-medium">{error.hour}</span>
            </div>
          </div>
          <div className="flex justify-evenly p-3">
            <button
              disabled={disabled}
              className="bg-green-500 hover:bg-green-600 transition duration-200 text-white font-bold py-2 px-4 rounded-md border border-green-700"
              type="submit"
            >
              Añadir
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 transition duration-200 text-white font-bold py-2 px-4 rounded-md"
              type="button"
              onClick={() => setOpenConfirm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Assign;
