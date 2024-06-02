import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MostrarRol = () => {
 const user = useSelector((state) => state.user.userProfile);
 const [userProfile, setUserProfile] = useState({
  role: "",
 });

 useEffect(() => {
  setUserProfile({
   role: user.id_role,
  });
 }, [user]);

 return (
  <div className="-mr-56">
   {userProfile.role === 1 && (
    <span className="bg-gray-800 ml-20 text-white font-semibold rounded-md px-2">
     ADMINISTRADOR
    </span>
   )}
   {userProfile.role === 2 && (
    <span className="bg-gray-800 ml-20 text-white font-semibold rounded-md px-2">
     SUPERVISOR
    </span>
   )}
   {userProfile.role === 3 && (
    <span className="bg-gray-800 ml-20 text-white font-semibold rounded-md px-2">
     COLABORADOR
    </span>
   )}
  </div>
 );
};

export default MostrarRol;
