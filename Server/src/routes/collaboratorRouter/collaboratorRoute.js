const { Router } = require("express");
const myCoursesHandler = require("../../handlers/collaborator/myCoursesHandler.js");
const searchMyCourseHandler = require("../../handlers/collaborator/searchMyCourseHandler.js")
const searchCourseMid = require("../../middleware/admin/searchCourseMid.js");

const collaboratorRoute = Router();

collaboratorRoute.get("/courses", myCoursesHandler);
collaboratorRoute.get("/searchcourse", searchCourseMid, searchMyCourseHandler);

module.exports = collaboratorRoute;
