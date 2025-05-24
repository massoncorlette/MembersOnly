const express = require("express");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const handleCreateUser = require("../controllers/dataController/createController");

const signupRouter = Router();
signupRouter.use(express.urlencoded({ extended: true }));

signupRouter.get("/", (req, res) => res.render("sign-up-form"));

signupRouter.post("/", async (req, res, next) => {
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   await pool.query("insert into users (first, last, email, password) values ($1, $2, $3, $4)", [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]);
   res.redirect("/");
  } catch (error) {
     console.error(error);
     next(error);
    }
 });

 module.exports = signupRouter
 