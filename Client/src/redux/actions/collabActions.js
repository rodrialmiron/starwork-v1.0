import axios from "axios";
import { useHeader } from "../../Hooks/useHeader";
import { getAllCourses, searchcourse } from "../slices/collabSlice";
import { setErrorAlerts } from "../slices/userSlice";
import useError from "../../Hooks/useError";

export const getAllCoursesCollab = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/collaborator/courses", useHeader());
    dispatch(getAllCourses(response.data.Courses));
  } catch (error) {
    error.response.data.error !== "Aún no tienes cursos asignados" &&
      dispatch(setErrorAlerts(useError(error)));
  }
};
export const searchcourseColla = (firstName) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/user/collaborator/searchcourse?query=${firstName}`,
      useHeader()
    );

    dispatch(searchcourse(response.data));
  } catch (error) {
    console.log(useError(error));
    dispatch(getAllCourses([]));
  }
};
