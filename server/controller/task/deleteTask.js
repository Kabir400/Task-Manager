const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models-->
const taskModel = require("../../model/task.model.js");

const deleteTask = TryCatch(async (req, res, next) => {
  const { taskId } = req.body;

  if (!taskId) {
    return next(new ApiError(400, "Task id is required"));
  }
  //create task
  const task = await taskModel.findByIdAndDelete(taskId);

  const apiresponse = new ApiResponse(
    200,
    "Task deleted successfully",
    true,
    task
  );
  res.status(200).json(apiresponse);
});

module.exports = deleteTask;
