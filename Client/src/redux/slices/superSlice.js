import {createSlice} from "@reduxjs/toolkit";

export const superSlice = createSlice({
    name:"supervisor",
    initialState:{
        allUsers: [],
        followUp: [],
        allCourses:[]
    },
    reducers:{
        setAllUsers: (state,action) => {
            state.allUsers = action.payload
        },
        setFollowUp: (state, action) =>{
            state.followUp =  action.payload
        },
        setAllCourses:(state,action) => {
            state.allCourses = action.payload
        }
    }
})

export const {setAllUsers,setAllCourses, setFollowUp} = superSlice.actions
export default superSlice.reducer 