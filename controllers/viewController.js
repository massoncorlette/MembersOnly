
// const db = require("../db/queries");

async function displayLogin(req, res, next) {

  res.render("index", { user: req.user });

};

module.exports = {
  displayLogin
};