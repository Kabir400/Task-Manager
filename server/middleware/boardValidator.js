const { body } = require("express-validator");

const boardValidator = [
  // Validate email
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .escape(),

  body("taskArr")
    .isArray({ min: 1 })
    .withMessage("Nothing new to add in the board"),

  body("taskArr.*.taskId").notEmpty().withMessage("Task Id is required"),
  body("taskArr.*.creatorId").notEmpty().withMessage("Creator Id is required"),
];

module.exports = boardValidator;
