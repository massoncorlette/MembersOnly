
// const db = require("../db/queries");

const { validationResult } = require("express-validator");

const db = require("../db/queries");


async function displayLogin(req, res) {
  const messages = await db.getAllMessages();
  let lastMessage = null;

  if (messages) {
    lastMessage = messages.pop();
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors, "errors");
    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  res.render(("index"),{message:lastMessage});
};

async function displayHome(req,res) {

  const messages = await db.getAllMessages();

  res.render(("home") , {user: req.user, messages:messages});

};

async function displayMessageBox(req,res) {
  res.render(("messagebox"), {user: req.user});
};

async function displayMembersOnly(req,res) {
  res.render(("membersonly"));
};

module.exports = {
  displayLogin, 
  displayHome,
  displayMessageBox,
  displayMembersOnly
};