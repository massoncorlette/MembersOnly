const express = require("express");
const { Router } = require("express");


const homeRouter = Router();
homeRouter.use(express.urlencoded({ extended: true }));

homeRouter.get("/", (req, res) => {
  res.render(("index") , {user: req.user});
});



homeRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = homeRouter;