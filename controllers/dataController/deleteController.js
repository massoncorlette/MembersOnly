const pool = require("../../db/pool");


async function handleDeleteMessage(req, res, next) {

  const { message_id } = req.params;

  try {
    await pool.query("DELETE FROM membermessages WHERE message_id = $1", [message_id]);
    res.redirect("/home");
  } catch (error) {
    console.error(error);
    next(error);
  }


}

module.exports = {
  handleDeleteMessage
}