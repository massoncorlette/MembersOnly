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

async function getMessagesInfo() {

  const allMessages = await getAllMessages();

  const results = await allMessages.map((message) => {
    const user = pool.query("SELECT first FROM users WHERE user_id = $1",
      [message.user_id]
    );

    return {
      message:message.message,
      user:user
    };
  
  });
  return results;
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
  getMessagesInfo,
  checkEmail
}