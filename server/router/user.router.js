const express = require("express");
const router = express.Router();

//middlewares
const validate = require("../middleware/validate.js");
const userValidator = require("../middleware/userValidator.js");
const settingsValidator = require("../middleware/settingsValidator.js");

//controllers
const createUser = require("../controller/user/createUser.js");
const login = require("../controller/user/loginUser.js");
const logout = require("../controller/user/logoutUser.js");
const isLoggedIn = require("../controller/user/isLoggedIn.js");
const getInitials = require("../controller/user/getInitials.js");
const getAlluser = require("../controller/user/getAlluser.js");
const updateUser = require("../controller/user/updateUser.js");
const fetchUserInfo = require("../controller/user/fetchUserInfo.js");

//middlewares
const checkLogin = require("../middleware/checkLogin.js");

//routes
router.post("/signup", userValidator, validate, createUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/islogin", checkLogin, isLoggedIn);
router.get("/getinitials/:_id", checkLogin, getInitials);
router.get("/user/all", checkLogin, getAlluser);
router.put("/user/update", checkLogin, settingsValidator, validate, updateUser);
router.get("/user/info", checkLogin, fetchUserInfo);

module.exports = router;
