const { body } = require("express-validator");

const settingsValidator = [
  // Validate email field - allow empty or valid email format
  body("email")
    .custom((value) => {
      if (value === "") return true; // Allow empty
      return /\S+@\S+\.\S+/.test(value); // Validate format
    })
    .withMessage("Invalid email format"),

  // Validate name field - allow empty or only alphabetic characters
  body("name")
    .custom((value) => {
      if (value === "") return true; // Allow empty
      return /^[A-Za-z\s-]+$/.test(value); // Validate format
    })
    .withMessage("Name must contain only alphabets, spaces, or hyphens")
    .trim(),

  // Check if both old and new passwords are provided and valid
  body("oldPassword").custom((value, { req }) => {
    const { oldPassword, newPassword } = req.body;

    // Allow both to be empty for non-password updates
    if (!oldPassword && !newPassword) {
      return true;
    }

    // Require both fields for password updates
    if (oldPassword && newPassword) {
      const strongPasswordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

      if (!strongPasswordRegex.test(oldPassword)) {
        throw new Error(
          "Old password must be strong (at least 8 characters with uppercase, lowercase, number, and special character)"
        );
      }
      if (!strongPasswordRegex.test(newPassword)) {
        throw new Error(
          "New password must be strong (at least 8 characters with uppercase, lowercase, number, and special character)"
        );
      }
      return true;
    }

    // If one is missing, throw an error
    throw new Error("Both old and new passwords must be provided together");
  }),
];

module.exports = settingsValidator;
