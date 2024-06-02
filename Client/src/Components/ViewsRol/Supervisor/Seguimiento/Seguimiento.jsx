import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowUp } from "../../../../redux/actions/supervisorActions";
import { Detail } from "./Detail";
import MostrarRol from "../../MostrarRol/MostrarRol";

function Seguimiento() {
  const dispatch = useDispatch();

  const usersFollowUp = useSelector((state) => state.supervisor.followUp);

  useEffect(() => {
    dispatch(getFollowUp());
  }, []);

  return (
    <>
      <nav>
        <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
          SECCIÓN SEGUIMIENTO
          <MostrarRol />
        </h1>
      </nav>
      <div className="min-h-screen flex flex-col items-center gap-y-6 transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800 py-12">
        {usersFollowUp &&
          usersFollowUp.map((user) => {
            return <Detail user={user} />;
          })}
      </div>
    </>
  );
}

export default Seguimiento;
