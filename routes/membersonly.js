const { displayMembersOnly } = require("../controllers/viewController");
const { Router } = require("express");


const membersRouter = Router();


membersRouter.get("/", (req, res, next) => {
  return displayMembersOnly(req,res,next);
});

