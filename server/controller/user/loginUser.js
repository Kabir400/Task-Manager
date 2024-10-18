const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");
const SendCookie = require("../../utils/SendCookie.js");

const userModel = require("../../model/user.model.js");

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(400, "All fields are required"));
  }
  const user = await userModel.findOne({ email });

  //checking if user exists
  if (!user) {
    return next(new ApiError(400, "Invalid email or password"));
  }

  //comparing password
  if (!(await user.comparePassword(password))) {
    return next(new ApiError(400, "Invalid email or password"));
  }

  //generate access token
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  //sending cookies to the frontend
  SendCookie(res, "accessToken", accessToken, 5);
  SendCookie(res, "refreshToken", refreshToken, 15);

  //creating a response object
  const apiresponse = new ApiResponse(200, "User logged in successfully");

  //sending response
  res.status(apiresponse.status).json(apiresponse);
});

module.exports = login;
