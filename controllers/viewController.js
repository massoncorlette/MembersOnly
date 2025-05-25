
// const db = require("../db/queries");

const { validationResult } = require("express-validator");


async function displayLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors, "errors");
    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  res.render("index");

};

async function displayHome(req,res) {

  res.render(("home") , {user: req.user});

};

module.exports = {
  displayLogin, 
  displayHome
};