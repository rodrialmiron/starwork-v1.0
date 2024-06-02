import axios from "axios";
import {
  setAllUsers,
  setDeleteUsers,
  setInvitationCode,
  setStatusUser,
  setAddCourse,
  setCourses,
  setUserByName,
  setModifiedClass,
  setAddClass,
  setChangeStatusClass,
  setDeleteClass,
  setDeleteCourse,
  setChangeStatusCourse,
  setEditCourse,
  setSearchedCourse,
  setAllCodes,
  setModifiedLimitSlot,
  setSelected,
} from "../slices/adminSlice";
import useError from "../../Hooks/useError";
import useToast from "../../Hooks/useToast";
import { setErrorAlerts, setSucessAlerts } from "../slices/userSlice";
import useSuccess from "../../Hooks/useSuccess";
import { useHeader } from "../../Hooks/useHeader";
import { returnAuthToken } from "../../helpers/utils";

const { errorAlert } = useToast();

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return token;
};

//USUARIOS
export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/admin/getallusers", useHeader());
    let users = response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      roleName: user.Role.roleName,
      code: user.AccessCode.code,
      status: user.status,
      usedSlot: user.usedSlot,
      limitSlot: user.limitSlot,
    }));
    dispatch(setAllUsers(users));
  } catch (error) {
    errorAlert(useError(error));
  }
};

export const getUserByName = (firstName) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/admin/searchuser?query=${firstName}`, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    let users = response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      roleName: user.Role.roleName,
      code: user.AccessCode.code,
      status: user.status,
      usedSlot: user.usedSlot,
      limitSlot: user.limitSlot,
    }));
    dispatch(setUserByName(users));
  } catch (error) {
    dispatch(setUserByName([]));
  }
};

export const deleteUsers = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/user/admin/deleteUser/${id}`, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setDeleteUsers(id));
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const changeStatus = (user) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/statususer", user, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setStatusUser(user.id));
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

//CURSOS
export const getAllCourses = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/admin/courses", {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setCourses(response.data));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const addCourse = (course) => async (dispatch) => {
  try {
    const response = await axios.post("/user/admin/addcourse", course, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setAddCourse(response.data.result));
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};
export const deleteCourse = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/user/admin/deletecourse/${id}`, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setSelected([]));
    dispatch(setDeleteCourse(id));
    dispatch(getAllCourses());
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};
export const changeStatusCourse = (course) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/statuscourse", course, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setChangeStatusCourse(course.id));
    dispatch(setSucessAlerts(response.data.message));
    dispatch(setSelected([]));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const editCourse = (modifiedCourse) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/updatecourse", modifiedCourse, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setEditCourse(response.data.result));
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const searchCourse = (course) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/admin/searchcourse?query=${course}`, useHeader());
    dispatch(setSearchedCourse(response.data));
  } catch (error) {
    dispatch(setSearchedCourse(""));
  }
};

export const updatedClass = (clase) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/updateclass", clase, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setModifiedClass(response.data));
    dispatch(getAllCourses());
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    console.log(error);
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const addClass = (clase) => async (dispatch) => {
  try {
    const response = await axios.post("/user/admin/addClass", clase, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setAddClass(response.data.result));
    dispatch(getAllCourses());
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const changeStatusClass = (clase) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/statusclass", clase, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setChangeStatusClass(response.data.allClass));
    dispatch(getAllCourses());
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    console.log(error);
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const deleteClass = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/user/admin/deleteclass/${id}`, {
      headers: {
        auth: `Bearer ${getToken()}`,
      },
    });
    dispatch(setDeleteClass(id));
    dispatch(getAllCourses());
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const orderClass = (idClasses) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/orderclass", idClasses, useHeader());
    dispatch(setSucessAlerts(useSuccess(response)));
    dispatch(getAllCourses());
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const getAllAccessCodes = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/accesscode", useHeader());
    const allCodes = response.data.map((code) => {
      let updatedDate = code.createdAt.slice(0, 10);
      return {
        ...code,
        createdAt: updatedDate,
      };
    });
    dispatch(setAllCodes(allCodes));
  } catch (error) {
    dispatch(setErrorAlerts(useError(error)));
  }
};
export const createCode = (code) => async (dispatch) => {
  try {
    const response = await axios.post("/user/accesscode", code, useHeader());
    const createdCode = {
      ...response.data.accessCode,
      createdAt: response.data.accessCode.createdAt.slice(0, 10),
    };
    dispatch(setInvitationCode(createdCode));
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    console.log(error);
    dispatch(setErrorAlerts(useError(error)));
  }
};

export const modifiedLimitSlot = (user) => async (dispatch) => {
  try {
    const response = await axios.put("/user/admin/updateslot", user, useHeader());
    dispatch(setModifiedLimitSlot({ id: user.id, limitSlot: user.limitSlot }));
    dispatch(setSucessAlerts(response.data.message));
  } catch (error) {
    console.log(useError(error));
  }
};

export const searchCode = (code) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/accesscode/search?query=${code}`, returnAuthToken());
    dispatch(setAllCodes(response.data));
  } catch (error) {
    dispatch(setAllCodes([]));
    console.log(useError(error));
  }
};
