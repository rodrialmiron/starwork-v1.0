const { Router } = require("express");
const userRoute = require("./userRoute.js");
const tokenServices = require("../services/tokenServices.js");
const emailServices = require("../services/emailServices.js");
const emailRecoverServices = require("../services/emailRecoverServices.js");
const loginHandler = require("../handlers/loginHandler.js");
const registerHandler = require("../handlers/registerHandler.js");
const viewCoursesHandler = require("../handlers/viewCoursesHandler.js");
const verifyEmailHandler = require("../handlers/verifyEmailHandler.js");
const verifyRecoverHandler = require("../handlers/verifyRecoverHandler.js");
const changePasswordHandler = require("../handlers/changePasswordHandler.js");
const registerMid = require("../middleware/registerMid.js");
const loginMid = require("../middleware/loginMid.js");
const emailRecoveryMid = require("../middleware/emailRecoveryMid.js");
const verifyRecoverMid = require("../middleware/verifyRecoverMid.js");
const changePasswordMid = require("../middleware/changePasswordMid.js");

const router = Router();

router.use("/user", tokenServices, userRoute);
router.post("/login", loginMid, loginHandler);
router.post("/register", registerMid, emailServices, registerHandler);
router.use("/verify", verifyEmailHandler);
router.use("/viewcourses", viewCoursesHandler);
router.post("/recover", emailRecoveryMid, emailRecoverServices);
router.post("/verifyrecover", verifyRecoverMid, verifyRecoverHandler);
router.put("/changePassword", changePasswordMid, changePasswordHandler);

module.exports = router;
