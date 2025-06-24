const { displayMessageBox } = require("../controllers/viewController");
const { Router } = require("express");
const {
  handleCreateMessage,
} = require("../controllers/dataController/createController");
const { validateCreateMessage } = require("../controllers/validation");

const messageRouter = Router();

messageRouter.get("/", (req, res, next) => {
  return displayMessageBox(req, res, next);
});

messageRouter.post("/", validateCreateMessage(), handleCreateMessage);

module.exports = messageRouter;
