const express = require("express");
const router = express.Router();

//middlewares
const taskValidator = require("../middleware/taskValidator.js");
const validate = require("../middleware/validate.js");

//controllers
const createTask = require("../controller/task/createTask.js");
const getWeekTask = require("../controller/task/getWeekTask.js");

//middlewares
const checkLogin = require("../middleware/checkLogin.js");

//routes
router.post("/task/create", checkLogin, taskValidator, validate, createTask);
router.get("/task/week", checkLogin, getWeekTask);

module.exports = router;
