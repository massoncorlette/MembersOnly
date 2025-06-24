const authenticateUser = require("../config/passport");
const { Router } = require("express");
const { displayLogin } = require("../controllers/viewController");

// const { displayHome } = require("../controllers/viewController");

//const { handleReadUser } = require("../controllers/dataController/viewController");
const { validateUser } = require("../controllers/validation");

const indexRouter = Router();

indexRouter.get("/", (req, res, next) => {
  return displayLogin(req, res, next);
});

indexRouter.post("/", validateUser(), authenticateUser);

module.exports = indexRouter;
