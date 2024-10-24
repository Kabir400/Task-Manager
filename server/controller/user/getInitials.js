const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const getInitials = require("../../utils/getInitials.js");

//models
const userModel = require("../../model/user.model.js");

const getinitials = TryCatch(async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findOne({ _id });
  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  const initials = getInitials(user.name);

  const apiresponse = new ApiResponse(200, "User found successfully", true, {
    initials,
  });
  res.status(200).json(apiresponse);
});

module.exports = getinitials;
