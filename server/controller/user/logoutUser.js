const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const logout = TryCatch(async (req, res, next) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json(new ApiResponse(200, "successfully logout"));
});

module.exports = logout;
