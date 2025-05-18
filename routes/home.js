const express = require("express");
const { Router } = require("express");
const { displayHome } = require("../controllers/viewController");


const homeRouter = Router();
homeRouter.use(express.urlencoded({ extended: true }));

homeRouter.get("/", (req, res, next) => {
  res.locals.user = req.user;
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