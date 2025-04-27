
// const db = require("../db/queries");

async function displayLogin(req, res, next) {

  res.render("login");

};

module.exports = {
  displayLogin
};