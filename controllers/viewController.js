
// const db = require("../db/queries");

async function displayLogin(req, res) {

  res.render("index");

};

async function displayHome(req,res,next) {

  res.render(("home") , {user: req.user});

};

module.exports = {
  displayLogin, 
  displayHome
};