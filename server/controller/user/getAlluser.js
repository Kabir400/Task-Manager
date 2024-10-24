const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const getInitials = require("../../utils/getInitials.js");

const userModel = require("../../model/user.model.js");

const getAlluser = TryCatch(async (req, res, next) => {
  const { _id } = req.user;

  const user = await userModel
    .find({
      _id: { $ne: _id },
    })
    .select("name email _id");

  const modifiedUser = user.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      initials: getInitials(user.name),
    };
  });

  const apiresponse = new ApiResponse(
    200,
    "User fetched successfully",
    true,
    modifiedUser
  );

  res.status(200).json(apiresponse);
});

module.exports = getAlluser;
