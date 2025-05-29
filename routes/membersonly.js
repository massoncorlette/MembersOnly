const { displayMembersOnly } = require("../controllers/viewController");
const { Router } = require("express");
const {validateSecret} = require("../controllers/validation");
require('dotenv').config();


const membersRouter = Router();


membersRouter.get("/", (req, res, next) => {
  return displayMembersOnly(req,res,next);
});



membersRouter.post("/", validateSecret)

module.exports = membersRouter;

