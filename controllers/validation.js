const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 5 and 24 characters.";

function validateUser() {
  return [
    body("firstname")
      .trim()
      .notEmpty()
      .isAlpha("en-US", { ignore: " " })
      .withMessage(`User first and last name ${alphaErr}`)
      .isLength({ min: 0, max: 24 })
      .withMessage(`User first and last name ${lengthErr}`),
    body("lastname")
    .trim()
    .notEmpty()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`User first and last name ${alphaErr}`)
    .isLength({ min: 0, max: 24 })
    .withMessage(`User first and last name ${lengthErr}`),
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
  ];
}

module.exports = {
   validateUser
}
