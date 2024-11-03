//imports-->
const TryCatch = require("../utils/TryCatch.js");
const ApiError = require("../utils/ApiError.js");
const SendCookie = require("../utils/SendCookie.js");

const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model.js");

//why we use two tokens-->

//in this case we are maintaining two tokens - because we want user to remain logged in, even if the accesstoken expires,

//user will be logged out if he/she don't visit the website for 15days ,

//if the accesstoken expires after 5days then we will generate new accesstoken and refresh token

//...........................................................

const checkLogin = TryCatch(async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return next(new ApiError(401, "you are unauthorized"));
  }

  let token, secret;

  if (accessToken) {
    token = accessToken;
    secret = process.env.ACCESS_TOKEN_SECRET_KEY;
  } else if (refreshToken) {
    token = refreshToken;
    secret = process.env.REFRESH_TOKEN_SECRET_KEY;
  }

  // Decode and verify token
  let decoded;
  try {
    decoded = jwt.verify(token, secret); // Verify the token
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token", error));
  }
  const user = await userModel.findById(decoded._id).select("-password");

  if (!user) {
    return next(new ApiError(401, "You are unauthorized", null, false));
  }

  // If refreshToken is used, generate new tokens
  if (!accessToken && refreshToken) {
    const newaccessToken = user.generateAccessToken();
    const newrefreshToken = user.generateRefreshToken();

    SendCookie(res, "accessToken", newaccessToken, 5);
    SendCookie(res, "refreshToken", newrefreshToken, 15);
  }

  req.user = user;

  next();
});

module.exports = checkLogin;
