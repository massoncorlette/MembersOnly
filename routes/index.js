const express = require("express");
const session = require("express-session");
const authenticateUser = require("../config/passport");
const { Router } = require("express");
const { displayLogin } = require("../controllers/viewController");
const pgSession = require('connect-pg-simple')(session);
const pgPool = require("../db/pool");


// const { displayHome } = require("../controllers/viewController");

//const { handleReadUser } = require("../controllers/dataController/viewController");
const { validateUser } = require("../controllers/validation");
//const { displayLogin } = requrie("../controllers/viewController");

const indexRouter = Router();
indexRouter.use(express.urlencoded({ extended: true }));



indexRouter.use(session({
  store: new pgSession({
    pool : pgPool  ,
    createTableIfMissing: true
           
  }),
  // express session options
  secret: "cats",
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

indexRouter.get("/", (req, res, next) => {
  return displayLogin(req, res, next);
});

indexRouter.post("/log-in", validateUser(), authenticateUser);




module.exports = indexRouter;