import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({id_role,accessRoutesId}) => {
    if(!id_role || id_role !== accessRoutesId ) return <Navigate to="/" />
    
    return <Outlet/>
}

export default ProtectedRoutes