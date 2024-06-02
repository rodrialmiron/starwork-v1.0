import NavCodigoInvitacion from "./NavCodigoInvitacion";
import Tabla from "./Tabla";
import useHandleChange from "../../../../Hooks/useHandleChange";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
 getAllAccessCodes,
 searchCode,
} from "../../../../redux/actions/adminActions";
import MostrarRol from "../../MostrarRol/MostrarRol";

function CodigoInvitacion() {
 const dispatch = useDispatch();
 const codesearch = useSelector((state) => state.admin.allCodes);
 const [code, setCode] = useState({
  colla: "",
 });
 const handleChange = useHandleChange(code, setCode);

 useEffect(() => {
  if (code.colla) {
   dispatch(searchCode(code.colla));
  } else {
   dispatch(getAllAccessCodes());
  }
 }, [code.colla]);
 return (
  <>
   <nav>
    <h1 className="flex text-white font-bold justify-center items-center bg-custom-blue">
     SECCIÓN CODIGO DE INVITACIÓN
     <MostrarRol />
    </h1>
   </nav>

   <div className="min-h-screen transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-800 w-full">
    <NavCodigoInvitacion handleChange={handleChange} />

    <Tabla invitationCodes={codesearch} />
   </div>
  </>
 );
}

export default CodigoInvitacion;