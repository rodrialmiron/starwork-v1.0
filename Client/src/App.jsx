//?React y helpers
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { menuItemsForNav, renderNav, routes, getAccess } from "./helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import useToast from "./Hooks/useToast";
import { setErrorAlerts, setSucessAlerts } from "./redux/slices/userSlice";

//?Comonentes
import Home from "./Components/Landin/Home/Home";
import Register from "./Components/Landin/Register/Register";
import Login from "./Components/Landin/Login/Login";
import {VerifyEmail}  from "./Components/Landin/VerifyEmail/VerifyEmail.jsx";
import RecoveryPass from "./Components/RecoveryPass/RecoveryPass";
import CodeVerify from "./Components/RecoveryPass/CodeVerify/CodeVerify";
import PassForm from "./Components/RecoveryPass/PassForm/PassForm";
import PageNotFound from "./Components/PageNotFound/404Page";
import NavBar from "./Components/ViewsRol/Admin/NavBar/NavBar";
import ProtectedRoutes from "./Components/protectedRoutes/ProtectedRoutes";
import ViewCourses from "./Components/Landin/Nav/ViewCourses/ViewCourses";
import Nosotros from './Components/Landin/Nav/Nosotros/Nosotros'

//?Componentes de roles:
//Admin
import DashboardAdmin from "./Components/ViewsRol/Admin/Dashboard/Dashboard";
import Usuarios from "./Components/ViewsRol/Admin/Usuarios/Usuarios";
import CodigoInvitacion from "./Components/ViewsRol/Admin/CodigoInvitacion/CodigoInvitacion";
import Courses from "./Components/ViewsRol/Admin/Courses/Courses";
//Super
import DashboardSuper from "./Components/ViewsRol/Supervisor/Dashboard/Dashboard";
import Colaborador from "./Components/ViewsRol/Supervisor/Colaborador/Colaborador";
import ExplorarCurso from "./Components/ViewsRol/Supervisor/Explorar Cursos/ExplorarCurso";
import Seguimiento from "./Components/ViewsRol/Supervisor/Seguimiento/Seguimiento";
//Colab
import DashboardColab from "./Components/ViewsRol/Colaborador/Dashboard/Dashboard";
import SeguimientoColab from "./Components/ViewsRol/Colaborador/Seguimiento/Seguimiento";
import MisCursos from "./Components/ViewsRol/Colaborador/ExplorarCursos/ExplorarCursos";

function App() {
  const navigate = useNavigate();
  const success = useSelector((state) => state.user.successAlerts);
  const error = useSelector((state) => state.user.errorAlerts);
  const { successAlert, errorAlert } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      successAlert(success);
    }
    dispatch(setSucessAlerts(""));
  }, [success]);

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    dispatch(setErrorAlerts(""));
  }, [error]);

  const { pathname } = useLocation();

  const user = localStorage.getItem("user");
  const { role } = user ? JSON.parse(user) : { role: "invitado" };

  useEffect(() => {
    const handlePopstate = () => {
      const user = localStorage.getItem("user");
      const { access } = user ? JSON.parse(user) : { access: "false" };
      if (!access) navigate("/");
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const { menuItems, additionalItems } = menuItemsForNav(role); // aca determinamos la navBar segun el rol

  return (
    <div className="flex w-full">
      {getAccess() && renderNav(routes, pathname) && (
        <div className="h-full mr-auto">
          {" "}
          <NavBar
            menuItems={menuItems}
            additionalItems={additionalItems}
          />{" "}
        </div>
      )}
      <div className="flex-grow m-auto bg-gray-200 dark:bg-gray-800">
        <Routes>
          {/* Rutas de entrada */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />

          {/* Rutas de Admin */}
          <Route
            element={<ProtectedRoutes id_role={role} accessRoutesId={1} />}
          >
            <Route path="/user/admin/profile" element={<DashboardAdmin />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/gestionar_cursos" element={<Courses />} />
            <Route
              path="/codigo_de_invitacion"
              element={<CodigoInvitacion />}
            />
          </Route>
          {/* Rutas de supervisor */}
          <Route
            element={<ProtectedRoutes id_role={role} accessRoutesId={2} />}
          >
            <Route
              path="/user/supervisor/profile"
              element={<DashboardSuper />}
            />
            <Route path="/supervisor/colaboradores" element={<Colaborador />} />
            <Route path="/supervisor/seguimiento" element={<Seguimiento />} />
            <Route
              path="/supervisor/explorarcursos"
              element={<ExplorarCurso />}
            />
          </Route>
          {/* Rutas Colaborador*/}
          <Route
            path="/user/collaborator/profile"
            element={<DashboardColab />}
          />
          <Route
            path="/collaborator/seguimiento"
            element={<SeguimientoColab />}
          />
          <Route path="/collaborator/misCursos" element={<MisCursos />} />

          {/*Rutas recovery */}
          <Route path="/recovery_password" element={<RecoveryPass />} />
          <Route path="/verify_code" element={<CodeVerify />} />
          <Route path="/passwordInsert" element={<PassForm />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />

          {/*Rutas NotFound */}
          <Route path="*" element={<PageNotFound />} />

          {/* Rutas de componentes */}
          <Route path="/viewcourses" element={<ViewCourses />} />
          <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
