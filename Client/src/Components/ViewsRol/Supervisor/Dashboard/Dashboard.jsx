import React from "react";
import Cuenta from "../../Admin/Cuenta/Cuenta";
import { useDispatch } from "react-redux";
import {
  getAllCourses,
  getAllUsers,
} from "../../../../redux/actions/supervisorActions";
// import NavBar from "../NavBar/NavBar";

const Profile = () => {
  const dispatch = useDispatch();
  const { role } = JSON.parse(localStorage.getItem("user"));
  if (role == 2) {
    dispatch(getAllCourses());
    dispatch(getAllUsers());
  }
  return (
    <>
      <div className="bg-gray-200 min-h-screen dark:bg-gray-800 transition duration-300 ease-in-out">
        {/* <NavBar /> */}
        <Cuenta />
      </div>
    </>
  );
};

export default Profile;
