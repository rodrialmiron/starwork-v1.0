import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setErrorAlerts,setSucessAlerts } from "../../../../redux/slices/userSlice";
import { disabledForSeconds, returnAuthToken } from "../../../../helpers/utils";
import { getAllUsers } from "../../../../redux/actions/supervisorActions";
import { useState } from "react";


function Delete({selectUsers,setSelectUsers,setIsOpenDelete,setInput}) {
  const dispatch = useDispatch()
  const [disabled,setDisabled] = useState(false)

  const handleDelete = () => {
    disabledForSeconds(setDisabled)
    selectUsers.forEach(user=>{
    axios.delete(`/user/supervisor/deleteUser/${user}`,returnAuthToken())
    .then(({data})=>{
      dispatch(setSucessAlerts(data.message))
      setSelectUsers([])
      setIsOpenDelete(false)
      setInput({name:""})
      dispatch(getAllUsers())
    })
    .catch(error=>{
      dispatch(setErrorAlerts(useError(error)))
    })
  })
  }
  return (
    <div>
         {selectUsers.length === 0 ? (
    <section className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>DEBE SELECCIONAR LOS USUARIOS QUE DESEA BORRAR</span>
     </div>
     
      <button
       className="ml-5 mt-2 -mb-4 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
       onClick={()=>setIsOpenDelete(false)}
       >
       OK
      </button>
    </section>
   ) : (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>¿ESTAS SEGURO QUE DESEA ELIMINAR ESTOS USUARIOS?</span>
     </div>
     <div className="flex flex-col justify-center items-center space-y-4">
     </div>

     <section className="flex justify-center mt-4 -mb-4">
      <button
       disabled={disabled}
       className="rounded-md bg-green-600 hover:bg-green-800 transition duration-200 text-white font-bold py-1 px-2 h-8 w-10"
       onClick={handleDelete}
      >
       SI
      </button>
      <button
       className="ml-7 rounded-md bg-red-600 hover:bg-red-800 transition duration-200 text-white font-bold py-1 px-2 h-8 w-10"
       onClick={()=>setIsOpenDelete(false)}
      >
       NO
      </button>
     </section>
    </div>
   )}
    </div>
  );
}

export default Delete;
