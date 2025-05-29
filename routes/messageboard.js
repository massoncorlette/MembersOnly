const { displayMessageBox } = require("../controllers/viewController");
const { Router } = require("express");
const { handleCreateMessage } = require("../controllers/dataController/createController");
const { validateCreateMessage } = require("../controllers/validation");


const messageRouter = Router();

messageRouter.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

messageRouter.get("/", (req, res, next) => {
  return displayMessageBox(req,res,next);
});

messageRouter.post("/submit-msg", validateCreateMessage(), handleCreateMessage); 

module.exports = messageRouter;

