const { body } = require("express-validator");

const statusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["TO-DO", "BACKLOG", "PROGRESS", "DONE"])
    .withMessage("Invalid priority value"),
  body("taskId").notEmpty().withMessage("Task id is required"),
];

module.exports = statusValidator;
