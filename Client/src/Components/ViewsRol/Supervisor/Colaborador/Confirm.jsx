const Confirm = ({setOpenConfirm}) => {

    return(<>

    <div className="flex flex-col justify-center items-center p-6 bg-gray-200 rounded-xl shadow-md overflow-auto dark:bg-gray-800 dark:text-white">
     <div>
      <span>DEBE SELECCIONAR LOS USUARIOS A QUIEN ASIGNAR</span>
     </div>
     <div>
      <button
       onClick={()=>setOpenConfirm(false) }
       className="ml-5 mt-2 rounded-md bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold py-1 px-2"
      >
       OK
      </button>
     </div>
    </div>
    </>)
}

export default Confirm