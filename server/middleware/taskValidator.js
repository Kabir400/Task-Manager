const { body } = require("express-validator");

//escape-->escapes the speacial chracters
//.isISO8601()-->checks if the string is a valid (yyyy-mm-dd)date
//* --> you can go nested inside the array

const taskValidator = [
  // Validate title
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .trim()
    .escape(),

  // Validate priority
  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"])
    .withMessage("Invalid priority value"),

  // Validate due date
  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid due date format"),

  // Validate checklist array
  body("checkLists")
    .isArray({ min: 1 })
    .withMessage("Checklist must be an array with at least one item"),

  // Validate each checklist item
  body("checklists.*.title")
    .notEmpty()
    .withMessage("Checklist item title is required")
    .isString()
    .trim()
    .escape(),

  body("checklists.*.status")
    .optional()
    .isBoolean()
    .withMessage("Status must be a boolean value"),
];

module.exports = taskValidator;
