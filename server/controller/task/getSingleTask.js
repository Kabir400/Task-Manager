const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError.js");

//models
const taskModel = require("../../model/task.model.js");

const getSingleTask = TryCatch(async (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(new ApiError(400, "Invalid task ID format"));
  }

  const task = await taskModel.findById(taskId);

  if (!task) {
    return next(new ApiError(404, "Task not found"));
  }

  const apiresponse = new ApiResponse(
    200,
    "Task found successfully",
    true,
    task
  );
  res.status(200).json(apiresponse);
});

module.exports = getSingleTask;
