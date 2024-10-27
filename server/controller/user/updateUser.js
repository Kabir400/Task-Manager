const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models
const userModel = require("../../model/user.model.js");

const updateUser = TryCatch(async (req, res, next) => {
  const { _id, email: userEmail } = req.user;
  const { name, email, oldPassword, newPassword } = req.body;

  //validation (backend)-->
  if (name && email) {
    return next(
      new ApiError(400, "You can't update both name and email at a time")
    );
  }
  if (name && (oldPassword || newPassword)) {
    return next(
      new ApiError(400, "You can't update both name and password at a time")
    );
  }
  if (email && (oldPassword || newPassword)) {
    return next(
      new ApiError(400, "You can't update both email and password at a time")
    );
  }
  if (!name && !email && !oldPassword && !newPassword) {
    return next(new ApiError(400, "No values to update"));
  }
  //..........................................................
  //executing

  //name--->
  if (name) {
    const user = await userModel.findOne({ _id });
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }
    user.name = name;
    await user.save();
    const apiresponse = new ApiResponse(
      200,
      "User updated successfully",
      true,
      { isItName: true }
    );
    res.status(200).json(apiresponse);
  }

  //email-->
  if (email) {
    if (email === userEmail) {
      return next(new ApiError(400, "Your email is same as before"));
    }

    const user = await userModel.findOne({ _id });
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }
    user.email = email;
    await user.save();

    //logout the user
    res.clearCookie("accessToken", {
      path: "/",
      sameSite: "None",
      secure: true,
    });

    res.clearCookie("refreshToken", {
      path: "/",
      sameSite: "None",
      secure: true,
    });

    const apiresponse = new ApiResponse(
      200,
      "User updated successfully",
      true,
      { isItName: false }
    );
    res.status(200).json(apiresponse);
  }

  //password-->
  if (oldPassword && newPassword) {
    const user = await userModel.findOne({ _id });
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }

    if (oldPassword === newPassword) {
      return next(
        new ApiError(400, "New password can't be same as old password")
      );
    }
    if (!(await user.comparePassword(oldPassword))) {
      return next(new ApiError(400, "Old password is incorrect"));
    }
    user.password = newPassword;
    await user.save();

    //logging out the user
    res.clearCookie("accessToken", {
      path: "/",
      sameSite: "None",
      secure: true,
    });

    res.clearCookie("refreshToken", {
      path: "/",
      sameSite: "None",
      secure: true,
    });

    const apiresponse = new ApiResponse(
      200,
      "User updated successfully",
      true,
      { isItName: false }
    );
    res.status(200).json(apiresponse);
  }
});

module.exports = updateUser;
