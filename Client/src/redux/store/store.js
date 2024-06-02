import {configureStore} from "@reduxjs/toolkit";
import admin from "../slices/adminSlice"
import supervisor from "../slices/superSlice"
import collaborator from "../slices/collabSlice"
import user from "../slices/userSlice"

export default configureStore({
    reducer:{
        admin: admin,
        supervisor: supervisor,
        collaborator: collaborator,
        user: user
    }
})