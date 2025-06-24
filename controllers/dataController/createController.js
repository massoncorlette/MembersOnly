const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const pool = require("../../db/pool");

async function handleCreateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up-form", {
      errors: errors.array(),
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "insert into users (first, last, email, password) values ($1, $2, $3, $4)",
      [
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        hashedPassword,
      ],
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleCreateMessage(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("messagebox", {
      errors: errors.array(),
    });
  }

  // creating Date obj, turning to Locale format, then converting to string to store in VARCHAR in sql table
  const now = new Date();

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = now.toLocaleDateString("en-US");
  const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

  const stringDate = formattedDate.toString();
  const stringTime = formattedTime.toString();

  try {
    const message = req.body.usermessage;
    const userID = req.user.user_id;
    await pool.query(
      "insert into membermessages (message, addedDate, addedTime, user_id) values ($1, $2, $3, $4)",
      [message, stringDate, stringTime, userID],
    );
    res.redirect("home");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  handleCreateUser,
  handleCreateMessage,
};
