const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const fetchUserInfo = TryCatch(async (req, res, next) => {
  const { name, email } = req.user;

  if (name && email) {
    const apiresponse = new ApiResponse(
      200,
      "User fetched successfully",
      true,
      { name, email }
    );
    res.status(200).json(apiresponse);
  } else {
    return next(new ApiError(400, "User not found"));
  }
});

module.exports = fetchUserInfo;
