const express = require("express");
const router = express.Router();

//middlewares
const validate = require("../middleware/validate.js");
const userValidator = require("../middleware/userValidator.js");

//controllers
const createUser = require("../controller/user/createUser.js");
const login = require("../controller/user/loginUser.js");
const logout = require("../controller/user/logoutUser.js");
const isLoggedIn = require("../controller/user/isLoggedIn.js");

//middlewares
const checkLogin = require("../middleware/checkLogin.js");

//routes
router.post("/signup", userValidator, validate, createUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/islogin", checkLogin, isLoggedIn);

module.exports = router;
