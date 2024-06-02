const { Router } = require("express");
const roleServices = require("../services/roleServices.js");
const adminRoute = require("./adminRouter/adminRoute.js");
const supervisorRoute = require("./supervisorRouter/supervisorRoute.js")
const collaboratorRoute = require("./collaboratorRouter/collaboratorRoute.js");
const accessCodeRoute = require("./accessCodeRouter/accessCodeRoute.js");
const profileRoute = require("./profileRouter/profileRoute.js");

const userRoute = Router();

userRoute.use("/admin", roleServices.admin, adminRoute);
userRoute.use("/supervisor", roleServices.sup, supervisorRoute);
userRoute.use("/collaborator", roleServices.collab, collaboratorRoute);
userRoute.use("/accesscode", roleServices.code, accessCodeRoute);
userRoute.use("/profile", profileRoute);



module.exports = userRoute;
 