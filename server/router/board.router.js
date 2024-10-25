const express = require("express");
const router = express.Router();

//controller-->
const addedToBoard = require("../controller/board/addedToBoard.js");

//middleware
const checkLogin = require("../middleware/checkLogin.js");
const Validate = require("../middleware/validate.js");
const boardValidator = require("../middleware/boardValidator.js");

router.post("/board", checkLogin, boardValidator, Validate, addedToBoard);

module.exports = router;
