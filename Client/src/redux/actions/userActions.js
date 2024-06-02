import axios from "axios";
import { setErrorAlerts, setSucessAlerts, setUserProfile } from "../slices/userSlice";
import useError from "../../Hooks/useError";
import { useRole } from "../../Hooks/useRole";
import { useHeader } from "../../Hooks/useHeader";
import { setAllUsers } from "../slices/adminSlice";

export const getToken = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    return token
}
const getId = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id
    return id
}

export const getUserProfile = () => async (dispatch) => {
    try{
        const response = await axios
        .get(`/user/profile/${getId()}`, {
          headers: {
            auth: `Bearer ${getToken()}`,
          },
        })
        console.log(response.data)
        const {
            id,
            firstName,
            lastName,
            phoneNumber,
            company,
            position,
            sector,
            email,
            id_role
          } = response.data
        dispatch(setUserProfile(
            {
                id,
                firstName,
                lastName,
                phoneNumber,
                company,
                position,
                sector,
                email,
                id_role
              } 
        ))
    }catch(error){
    console.log(useError(error))
    }
}
export const modifyProfile = (updatedUser) => async (dispatch) => {
    try{
        const response = await axios.put('/user/profile/update',
        updatedUser,
    {
        headers: {
            auth: `Bearer ${getToken()}`
        }
    })
    const {
        id,
        firstName,
        lastName,
        phoneNumber,
        company,
        position,
        sector,
        email,
        id_role
      } = response.data.result
      dispatch(setUserProfile({
        id,
        firstName,
        lastName,
        phoneNumber,
        company,
        position,
        sector,
        email,
        id_role
      }))
      dispatch(setSucessAlerts(response.data.message))
    }
    catch(error){
        dispatch(setErrorAlerts(useError(error)))
    }
}

export const orderUsers = ({orderBy, typeOrder}) => async (dispatch) =>{
  try{
    const response = await axios.get(`/user/${useRole()}/getallusers?sortParam=${orderBy}&sortOrder=${typeOrder}`,
    useHeader())
    let users = response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      roleName: user.Role.roleName,
      code: user.AccessCode.code,
      status: user.status,
      usedSlot: user.usedSlot,
      limitSlot: user.limitSlot
    }));
  useRole() === "admin" ? 
  dispatch(setAllUsers(users))
  :
  dispatch(setAllusersCollab(response.data))
  }
  catch(error){
    console.log(useError(error))
  }
}