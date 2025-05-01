const express = require("express");
const { Router } = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;


// const { displayHome } = require("../controllers/viewController");

//const { handleReadUser } = require("../controllers/dataController/viewController");
const { validateUser } = require("../controllers/validation");
//const { displayLogin } = requrie("../controllers/viewController");

const loginRouter = Router();
loginRouter.use(express.urlencoded({ extended: true }));

loginRouter.get("/", async (req, res, next) => {
  return displayLogin(req, res, next);
});

//check this
loginRouter.post("/", async (req, res, next) => {
  validateUser(),
  handleReadUser,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
});





module.exports = loginRouter;