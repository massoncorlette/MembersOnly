const express = require("express");
const { Router } = require("express");
const { displayHome } = require("../controllers/viewController");
const { handleDeleteMessage } = require("../controllers/dataController/deleteController");

const homeRouter = Router();
homeRouter.use(express.urlencoded({ extended: true }));

homeRouter.get("/", (req, res, next) => {

  return displayHome(req, res, next);
});

homeRouter.post("/:message_id/deletemessage", handleDeleteMessage);


module.exports = homeRouter;