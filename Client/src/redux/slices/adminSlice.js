import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admins",
  initialState: {
    allUsers: [],
    selected: [],
    allCourses: [],
    allClasses: {},
    allCodes: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUserByName: (state, action) => {
      state.allUsers = action.payload;
    },
    setDeleteUsers: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user.id !== action.payload
      );
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setStatusUser: (state, action) => {
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === action.payload) {
          return {
            ...user,
            status: !user.status,
          };
        }
        return user;
      });
    },
    setCourses: (state,action) =>{
      state.allCourses = action.payload.map((course) => ({
        ...course,
        Classes:  [
          ...course.Classes
            .filter(clase => clase.status) 
            .sort((a, b) => a.classNumber - b.classNumber),
          ...course.Classes
            .filter(clase => !clase.status)
        ]
      }))
    },
    setAddCourse: (state, action) =>{
      const newCourse = {
        ...action.payload,
        Classes: []
      }
      state.allCourses = [...state.allCourses, newCourse]
    },
    setDeleteCourse: (state, action) =>{
      state.allCourses = state.allCourses.filter(course =>
      course.id !== action.payload)
    },
    setChangeStatusCourse: (state, action) => {
      state.allCourses = state.allCourses.map((course) =>{
        if(course.id === action.payload){
          if(course.Classes){
            return{
              ...course,
              status: !course.status,
              Classes: course.Classes.map((clase) =>({
                ...clase,
                status: !course.status
              }))
            }
          } else {
            return {
              ...course,
              status: !course.status,
              Classes: []
            }
          }
        }
        return course
      })
    },
    setEditCourse: (state, action) => {
      state.allCourses = state.allCourses.map((course) => {
        if (course.id === action.payload.id) {
          return {
            ...course,
            topic: action.payload.topic,
            courseName: action.payload.courseName,
            description: action.payload.description
            };
        } else {
          return course;
        }
      });
    },
    setSearchedCourse: (state, action) =>{
      state.allCourses = action.payload
    },

    setClasses: (state, action) => {
      const course = state.allCourses.find(course => course.id === action.payload);
      if (course) {
        const classesWithStatusTrue = course.Classes
          .filter(clase => clase.status)
          .sort((a, b) => a.classNumber - b.classNumber);
        const classesWithStatusFalse = course.Classes
          .filter(clase => !clase.status);
    
        state.allClasses = {
          ...course,
          Classes: [...classesWithStatusTrue, ...classesWithStatusFalse]
        };
      }
    },
    setAddClass: (state, action) => {
      if (state.allClasses.Classes) {
        const classesWithStatusTrue = state.allClasses.Classes
          .filter(clase => clase.status)
          .sort((a, b) => a.classNumber - b.classNumber);
        const classesWithStatusFalse = state.allClasses.Classes
          .filter(clase => !clase.status);
    
        const newClassesWithStatusTrue = [...classesWithStatusTrue, action.payload].sort((a, b) => a.classNumber - b.classNumber);
    
        state.allClasses = {
          ...state.allClasses,
          Classes: [...newClassesWithStatusTrue, ...classesWithStatusFalse]
        };
      } else {
        state.allClasses = {
          ...state.allClasses,
          Classes: [action.payload]
        };
      }
    },
    setModifiedClass: (state,action) =>{
      state.allClasses = {
        ...state.allClasses,
        Classes: state.allClasses.Classes.map(clas => {
        if (clas.id === action.payload.result.id) {
          return action.payload.result;
        } else {
          return clas;
        }
      }).sort((a, b) => a.classNumber - b.classNumber)
      }
    },
    setChangeStatusClass: (state, action) => {
      const classesWithStatusTrue = action.payload.filter(clase => clase.status).sort((a, b) => a.classNumber - b.classNumber);
      const classesWithStatusFalse = action.payload
        .filter(clase => !clase.status);
    
      state.allClasses = {
        ...state.allClasses,
        Classes: [...classesWithStatusTrue, ...classesWithStatusFalse]
      };
    },
    setDeleteClass: (state, action) => {
      state.allClasses ={
        ...state.allClasses,
        Classes: state.allClasses.Classes.filter(clase =>
        clase.id !== action.payload)
      }

    },
    setAllCodes: (state,action) =>{
state.allCodes = action.payload
    },
    setInvitationCode: (state, action) => {
      state.allCodes = [...state.allCodes, action.payload];
    },

    setModifiedLimitSlot: (state, action) =>{
      state.allUsers = state.allUsers.map((user) =>{
        if(user.id === action.payload.id){
          return{
            ...user,
            limitSlot: action.payload.limitSlot
          }
        }
        return user
      })
    }
  },
});

export const {
  setAllUsers,
  setUserByName,
  setDeleteUsers,
  setSelected,
  setStatusUser,
  setAddCourse,
  setCourses,
  setDeleteCourse,
  setChangeStatusCourse,
  setEditCourse,
  setSearchedCourse,
  setClasses,
  setAddClass,
  setModifiedClass,
  setChangeStatusClass,
  setDeleteClass,
  setAllCodes,
  setInvitationCode,
  setModifiedLimitSlot
} = adminSlice.actions;
export default adminSlice.reducer;