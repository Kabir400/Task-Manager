const { body } = require("express-validator");

const settingsValidator = [
  // Check email is empty or valid
  body("email")
    .custom((value) => {
      if (value === "") return true;
      return /\S+@\S+\.\S+/.test(value);
    })
    .withMessage("Invalid email format"),

  //validating name is empty or valid(with proper alphabets)
  body("name")
    .custom((value) => {
      if (value === "") return true;
      return /^[A-Za-z\s-]+$/.test(value);
    })
    .withMessage("Name must contain only alphabets, spaces, or hyphens")
    .trim(),

  //checking old and new passwords are pesent if yes we validating both are strong or not
  body("oldPassword").custom((value, { req }) => {
    if (value === "" && req.body.newPassword === "") {
      return true;
    }
    if (value && req.body.newPassword) {
      // Validate both oldPassword and newPassword are strong
      const strongPasswordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      if (!strongPasswordRegex.test(value)) {
        throw new Error(
          "Old password must be strong (at least 8 characters with uppercase, lowercase, number, and special character)"
        );
      }
      if (!strongPasswordRegex.test(req.body.newPassword)) {
        throw new Error(
          "New password must be strong (at least 8 characters with uppercase, lowercase, number, and special character)"
        );
      }
      return true;
    }
    throw new Error("Both old and new passwords must be provided together");
  }),
];

module.exports = settingsValidator;
