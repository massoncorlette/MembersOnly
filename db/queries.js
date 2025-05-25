const pool = require("./pool");


async function checkEmail(value) {

  

  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [`${value}`],
  );

  console.log(user, "check");

  if (user.rows.length !== 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  checkEmail
}