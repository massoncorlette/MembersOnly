const pool = require("../../db/pool");
const { validateSecret } = require("../validation");


async function handleUpdateUserMembership(req, res, next) {

  const user = res.locals.currentUser;

  if (validateSecret(req, res, next)) {
    try {
      await pool.query("UPDATE users SET is_member = $1 WHERE user_id = $2", [true, user.user_id]);
      res.redirect("/home");
    } catch (error) {
        console.error(error);
        next(error);
      }
  } else {
    return res.status(400).render("membersonly", {
      error: "Incorrect Secret Code!",
    });
  }
};


async function handleUpdateUserAdmin(req, res, next) {
   // do last
};
  

module.exports = {
  handleUpdateUserMembership,
  handleUpdateUserAdmin
}



