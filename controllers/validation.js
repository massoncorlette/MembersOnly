const { body } = require("express-validator");
const { checkEmail } = require("../db/queries");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 5 and 24 characters.";

function validatePasswordInput() {
  return [
   body("password").matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Password must contain at least one special character')
  ]
}

function validateCreateUser() {
  return [
    body("firstname")
      .trim()
      .notEmpty().withMessage("First name is required")
      .isAlpha("en-US", { ignore: " " })
      .bail()
      .withMessage(`User first name ${alphaErr}`)
      .bail()
      .isLength({ min: 0, max: 24 })
      .withMessage(`User first name ${lengthErr}`)
      .bail(),
    body("lastname")
      .trim()
      .notEmpty().withMessage("Last name is required")
      .bail()
      .isAlpha("en-US", { ignore: " " })
      .withMessage(`User last name ${alphaErr}`)
      .bail()
      .isLength({ min: 0, max: 24 })
      .withMessage(`User last name ${lengthErr}`)
      .bail(),
    body("username")
      .trim()
      .notEmpty().withMessage("Email is required")
      .bail()
      .isEmail().withMessage('Must be a valid email')
      .bail()
      .custom(async value => {
        const user = await checkEmail(value);
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    ...validatePasswordInput(),

    body('passwordconfirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return value === req.body.password;
    }),
  ];
};

function validateUser() {
  
  return [
    
    body("username")
      .trim()
      .notEmpty().withMessage("Email is required")
      .bail()
      .isEmail().withMessage('Must be a valid email')
      .bail()
      .custom(async value => {
        const user = await checkEmail(value);
        if (!(user)) {
          throw new Error('E-mail not found');
        }
      }),
      ...validatePasswordInput(),
  ]
};

function validateCreateMessage() {
  return [
    body("usermessage")
    .trim()
    .notEmpty().withMessage("Can't Submit Empty Message")
    .bail()
    .isLength({ min: 0, max: 1000 }).withMessage("1000 Character Limit")
    .bail()
  ]
};

function validateSecret(req,res,next) {
  const storedSecret = "SecretPassword";
  const secret = req.body.passcode;
  if (secret == storedSecret) {
    console.log("true");
    return true;
  } else {
    return false;
  }

};

module.exports = {
   validateCreateUser,
   validateUser,
   validateCreateMessage,
   validateSecret
}
