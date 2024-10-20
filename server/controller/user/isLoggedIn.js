const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const isLoggedIn = TryCatch(async (req, res, next) => {
  const data = new ApiResponse(200, "User is logged in");
  res.status(200).json(data);
});

module.exports = isLoggedIn;
