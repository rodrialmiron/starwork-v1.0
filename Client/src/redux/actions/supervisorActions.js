import axios from "axios";
import { useHeader } from "../../Hooks/useHeader";
import { setErrorAlerts, setSucessAlerts } from "../slices/userSlice";
import useError from "../../Hooks/useError";
import { returnAuthToken } from "../../helpers/utils";
import { setAllCourses, setAllUsers, setFollowUp } from "../slices/superSlice";

export const getFollowUp = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/supervisor/enrollments", useHeader());
    dispatch(setFollowUp(response.data));
    dispatch(setSucessAlerts(response.data));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const getAllCourses = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/supervisor/courses", returnAuthToken());
    dispatch(setAllCourses(response.data));
  } catch (error) {
    dispatch(setErrorAlerts(error));
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/supervisor/getallusers", returnAuthToken());
    dispatch(setAllUsers(response.data));
  } catch (error) {
    console.log(setErrorAlerts(useError(error))) // aca esta el loop, NOOO TOCAAAAR
  }
};

export const searchUser = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/supervisor/searchuser?query=${name}`, returnAuthToken());
    dispatch(setAllUsers(response.data));
  } catch (error) {
    console.log(useError(error));
    dispatch(setAllUsers([]));
  }
};

export const searchCourse = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/supervisor/searchcourse?query=${name}`, returnAuthToken());
    dispatch(setAllCourses(response.data));
  } catch (error) {
    console.log(useError(error));
    dispatch(setAllCourses([]));
  }
};
