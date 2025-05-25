
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

 // const { user } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("insert into users (first, last, email, password) values ($1, $2, $3, $4)", [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]);
    res.redirect("/");
  } catch (error) {
      console.error(error);
      next(error);
    }
  };


module.exports = {
  handleCreateUser
}