const express = require("express");
const session = require("express-session");
const authenticateUser = require("../config/passport");
const { Router } = require("express");
const { displayLogin } = require("../controllers/viewController");


//gitignore is not working

// const { displayHome } = require("../controllers/viewController");

//const { handleReadUser } = require("../controllers/dataController/viewController");
const { validateUser } = require("../controllers/validation");
//const { displayLogin } = requrie("../controllers/viewController");

const loginRouter = Router();
loginRouter.use(express.urlencoded({ extended: true }));

// session middleware
loginRouter.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false
}));

// loginRouter.use(passport.session()); ?

loginRouter.get("/", (req, res, next) => {
  return displayLogin(req, res, next);
});

loginRouter.post("/log-in", validateUser(), authenticateUser);




module.exports = loginRouter;