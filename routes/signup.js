const express = require("express");
const { Router } = require("express");
const { handleCreateUser } = require("../controllers/dataController/createController");
const { validateCreateUser } = require("../controllers/validation");

const signupRouter = Router();
signupRouter.use(express.urlencoded({ extended: true }));

signupRouter.get("/", (req, res) => res.render("sign-up-form"));

signupRouter.post("/", validateCreateUser(),  handleCreateUser);



module.exports = signupRouter
 