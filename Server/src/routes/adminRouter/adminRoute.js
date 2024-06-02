const { Router } = require("express");
const usersHandler = require("../../handlers/usersHandler.js");
const deleteUserHandler = require("../../handlers/admin/deleteUserHandler.js");
const coursesHandler = require("../../handlers/coursesHandler.js");
const addCourseHandler = require("../../handlers/admin/addCourseHandler.js");
const addClassHandler = require("../../handlers/admin/addClassHandler.js");
const classHandler = require("../../handlers/admin/classHandler.js");
const deleteClassHandler = require("../../handlers/admin/deleteClassHandler.js");
const updateClassHandler = require("../../handlers/admin/updateClassHandler.js");
const statusCourseHandler = require("../../handlers/admin/statusCourseHandler.js");
const statusClassHandler = require("../../handlers/admin/statusClassHandler");
const statusUserHandler = require("../../handlers/admin/statusUserHandler.js");
const searchUserHandler = require("../../handlers/searchUserHandler.js");
const deleteCourseHandler = require("../../handlers/admin/deleteCourseHandler.js");
const updateCourseHandler = require("../../handlers/admin/updateCourseHandler.js");
const searchCourseHandler = require("../../handlers/searchCourseHandler.js");
const updateSlotHandler = require("../../handlers/admin/updateSlotHandler.js");
const userActivesMid = require("../../middleware/userActivesMid.js");
const deleteUserMid = require("../../middleware/admin/deleteUserMid.js");
const addCourseMid = require("../../middleware/admin/addCourseMid.js");
const addClassMid = require("../../middleware/admin/addClassMid.js");
const classMid = require("../../middleware/admin/classMid.js");
const deleteClassMid = require("../../middleware/admin/deleteClassMid.js");
const updateClassMid = require("../../middleware/admin/updateClassMid.js");
const statusCourseMid = require("../../middleware/admin/statusCourseMid.js");
const statusClassMid = require("../../middleware/admin/statusClassMid.js");
const statusUserMid = require("../../middleware/admin/statusUserMid.js");
const searchUserMid = require("../../middleware/searchUserMid.js");
const deleteCourseMid = require("../../middleware/admin/deleteCourseMid.js");
const updateCourseMid = require("../../middleware/admin/updateCourseMid.js");
const searchCourseMid = require("../../middleware/admin/searchCourseMid.js");
const updateSlotMid = require("../../middleware/admin/updateSlotMid.js");
const orderClassHandler = require("../../handlers/admin/orderClassHandler.js");
const adminRoute = Router();

adminRoute.get("/getallusers", userActivesMid, usersHandler);
adminRoute.delete("/deleteUser/:id", deleteUserMid, deleteUserHandler);
adminRoute.put("/statususer", statusUserMid, statusUserHandler);
adminRoute.get("/searchuser", searchUserMid, searchUserHandler);
adminRoute.put("/updateslot", updateSlotMid, updateSlotHandler);
adminRoute.post("/addcourse", addCourseMid, addCourseHandler);
adminRoute.delete("/deletecourse/:id", deleteCourseMid, deleteCourseHandler);
adminRoute.get("/courses", coursesHandler);
adminRoute.put("/statuscourse", statusCourseMid, statusCourseHandler);
adminRoute.put("/updatecourse", updateCourseMid, updateCourseHandler);
adminRoute.get("/searchcourse", searchCourseMid, searchCourseHandler);
adminRoute.post("/addclass", addClassMid, addClassHandler);
adminRoute.get("/classes/:id_course", classMid, classHandler);
adminRoute.delete("/deleteclass/:id", deleteClassMid, deleteClassHandler);
adminRoute.put("/statusclass", statusClassMid, statusClassHandler);
adminRoute.put("/updateclass", updateClassMid, updateClassHandler);
adminRoute.put("/orderclass", orderClassHandler);

module.exports = adminRoute;