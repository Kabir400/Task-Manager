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
    .isIn(["LOW PRIORITY", "MODERATE PRIORITY", "HIGH PRIORITY"])
    .withMessage("Invalid priority value"),

  // Validate checklist array
  body("checkLists")
    .isArray({ min: 1 })
    .withMessage("You must have at least one checklist item"),

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

// don't know why this wired error message is showing up when we passed a blank title in checkList array----> task validation failed: checkLists.0.title: Path `title` is required
module.exports = taskValidator;
