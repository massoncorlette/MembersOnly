const pool = require("./pool");


async function getAllMessages() {

  const result = await pool.query(
    "SELECT * FROM membermessages"
  );

  if (result.rows.length !== 0) {
    return result.rows;
  } else {
    return false;
  }
};

async function checkEmail(value) {

  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [`${value}`],
  );

  if (user.rows.length !== 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllMessages,
  checkEmail
}