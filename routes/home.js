const express = require("express");
const { Router } = require("express");
const { displayHome } = require("../controllers/viewController");


const homeRouter = Router();
homeRouter.use(express.urlencoded({ extended: true }));


homeRouter.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

homeRouter.get("/", (req, res, next) => {

  return displayHome(req, res, next);
});



homeRouter.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = homeRouter;