const { Router } = require("express");
const express = require("express");
const { displayMembersOnly } = require("../controllers/viewController");
const { handleUpdateUserMembership } = require("../controllers/dataController/updateController");
require('dotenv').config();


const membersRouter = Router();
membersRouter.use(express.urlencoded({ extended: true }));

membersRouter.get("/", (req, res, next) => {
  return displayMembersOnly(req,res,next);
});

membersRouter.post("/", handleUpdateUserMembership)

module.exports = membersRouter;

