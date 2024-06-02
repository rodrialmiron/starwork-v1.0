import {
    faUser,
    faClipboard,
    faDesktop,
    faCompass
  } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../redux/actions/userActions";

export const menuItemsForNav = (rol) => {
    let menuItems = [
        { icon: faUser, route: "/user/admin/profile" },
        { icon: faClipboard, route: "/usuarios" },
        { icon: faDesktop, route: "/gestionar_cursos" },
        { icon: faCompass, route: "/codigo_de_invitacion" },
      ];
      let additionalItems = [
        "Cuenta",
        "Usuarios",
        "Gestionar Cursos",
        "Codigo de Invitación",
      ];

      if(rol === 2){
        menuItems = [
          { icon: faUser, route: "/user/supervisor/profile" },
          { icon: faClipboard, route: "/supervisor/colaboradores" },
          { icon: faDesktop, route: "/supervisor/seguimiento" },
          { icon: faCompass, route: "/supervisor/explorarcursos" }
        ];
         additionalItems = [
          "Cuenta",
          "Colaboradores",
          "Seguimiento",
          "Explorar Cursos"
        ];

      }

      if(rol === 3){
        menuItems = [
          { icon: faUser, route: "/user/collaborator/profile" },
          { icon: faDesktop, route: "/collaborator/seguimiento"},
          { icon: faCompass, route: "/collaborator/misCursos" }
        ];
        additionalItems = [
          "Cuenta",
          "Seguimiento",
          "Explorar Cursos"
        ];

      }

      return {menuItems,additionalItems}
};

export const renderNav = (statePaths,location) => {
  if(statePaths.includes(location)) return true;
  return false
  
}

export const routes = [
  "/user/admin/profile",
  "/user/supervisor/profile",
  "/user/collaborator/profile",
  "/usuarios",
  "/gestionar_cursos",
  "/codigo_de_invitacion",
  "/supervisor/colaboradores",
  "/supervisor/seguimiento",
  "/supervisor/explorarcursos",
  "/collaborator/seguimiento",
  "/collaborator/misCursos"
];


export const getAccess = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const access = user?.access
  return access ? true : false
  }


  export const returnAuthToken = () => {
    return {
      headers:{
        auth: `Bearer ${getToken()}`
      }
    }
  }

  export const disabledForSeconds = (setState) => {
    setState(true)
    setTimeout(()=> {
      setState(false)
    },5000)
  }