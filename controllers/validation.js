const { body } = require("express-validator");
const checkEmail = require("../db/queries");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 5 and 24 characters.";

function validateCreateUser() {
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
      .custom(async value => {
        const user = await checkEmail(value);
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),

    body('password').isLength({ min: 5 }),
    body('passwordconfirm').custom((value, { req }) => {
      return value === req.body.password;
    }),
  ];
}

function validateUser() {
  return [

  ]
}

module.exports = {
   validateCreateUser,
   validateUser
}
