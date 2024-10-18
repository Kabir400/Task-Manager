const { body } = require("express-validator");

//user
const userValidator = [
  body("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything otherthan alphabet")
    .trim(),
  body("email").isEmail().withMessage("Invalid email!"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 symbol, 1 number"
    ),
];

module.exports = userValidator;
