const { Router } = require("express");
const deleteUserHandler = require("../../handlers/admin/deleteUserHandler.js");
const statusUserHandler = require("../../handlers/admin/statusUserHandler.js");
const usersHandler = require("../../handlers/usersHandler.js");
const searchUserHandler = require("../../handlers/searchUserHandler.js");
const getEnrollmentsHandler = require("../../handlers/supervisor/getEnrollmentsHandler");
const coursesHandler = require("../../handlers/coursesHandler.js");
const searchCourseHandler = require("../../handlers/searchCourseHandler.js");
const assingCourseHandler = require("../../handlers/supervisor/assingCourseHandler");
const userActivesMid = require("../../middleware/userActivesMid.js");
const searchUserMid = require("../../middleware/searchUserMid.js");
const assingCourseMid = require("../../middleware/assingCourseMid");
const deleteUserMid = require("../../middleware/admin/deleteUserMid.js");
const statusUserMid = require("../../middleware/admin/statusUserMid.js");
const searchCourseMid = require("../../middleware/admin/searchCourseMid.js");

const supervisorRoute = Router();

supervisorRoute.get("/getallusers", userActivesMid, usersHandler);
supervisorRoute.get("/searchuser", searchUserMid, searchUserHandler);
supervisorRoute.delete("/deleteUser/:id", deleteUserMid, deleteUserHandler);
supervisorRoute.put("/statususer", statusUserMid, statusUserHandler);
supervisorRoute.get("/courses", coursesHandler);
supervisorRoute.post("/assingcourse", assingCourseMid, assingCourseHandler);
supervisorRoute.get("/searchcourse", searchCourseMid, searchCourseHandler);
supervisorRoute.get("/enrollments", getEnrollmentsHandler);


module.exports = supervisorRoute;
