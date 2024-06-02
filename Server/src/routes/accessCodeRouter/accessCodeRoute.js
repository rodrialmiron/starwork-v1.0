const { Router } = require("express");
const { regAccessCodeMid } = require("../../middleware/accessCode/regAccessCodeMid.js");
const { regAccessCodeHandler } = require("../../handlers/accessCode/regAccessCodeHandler.js");
const { getAccessCodeHandler } = require("../../handlers/accessCode/getAccessCodeHandler.js");
const { searchAccessCodeHandler } = require("../../handlers/accessCode/searchAccessCodeHandler");

const accessCodeRoute = Router();

accessCodeRoute.post("/", regAccessCodeMid, regAccessCodeHandler);
accessCodeRoute.get("/", getAccessCodeHandler);
accessCodeRoute.get("/search", searchAccessCodeHandler);

module.exports = accessCodeRoute;
