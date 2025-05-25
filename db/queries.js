const pool = require("./pool");


async function checkEmail(value) {

  console.log(value, "check");

  const { user } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [`${value}`],
  );

  if (user) {
    return user;
  }
}

module.exports = {
  checkEmail
}