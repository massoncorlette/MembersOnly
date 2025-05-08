const express = require("express");
const session = require("express-session");
const { Router } = require("express");
const { passport } = require("../config/passport");
const { displayLogin } = require("../controllers/viewController");


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

//check this
loginRouter.post("/", async (req, res, next) => {
  validateUser(),
  //handleReadUser,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
});





module.exports = loginRouter;