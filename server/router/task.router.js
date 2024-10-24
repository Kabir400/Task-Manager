const express = require("express");
const router = express.Router();

//middlewares
const taskValidator = require("../middleware/taskValidator.js");
const validate = require("../middleware/validate.js");

//controllers
const createTask = require("../controller/task/createTask.js");
const getWeekTask = require("../controller/task/getWeekTask.js");
const editTask = require("../controller/task/EditTask.js");
const editStatus = require("../controller/task/EditStatus.js");
const deleteTask = require("../controller/task/deleteTask.js");

//middlewares
const checkLogin = require("../middleware/checkLogin.js");
const statusValidator = require("../middleware/statusVlidator.js");

//routes
router.post("/task/create", checkLogin, taskValidator, validate, createTask);
router.get("/task/week", checkLogin, getWeekTask);
router.put("/task/edit", checkLogin, taskValidator, validate, editTask);
router.put("/task/status", checkLogin, statusValidator, validate, editStatus);
router.delete("/task/delete", checkLogin, deleteTask);

module.exports = router;
