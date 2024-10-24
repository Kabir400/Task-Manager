const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models-->
const taskModel = require("../../model/task.model.js");

const editTask = TryCatch(async (req, res, next) => {
  const { title, priority, assignTo, dueDate, checkLists, taskId } = req.body;
  const { _id } = req.user;

  if (!taskId) {
    return next(new ApiError(400, "Task id is required"));
  }
  //create task
  const task = await taskModel.findByIdAndUpdate(
    taskId,
    {
      title,
      priority,
      createdBy: _id,
      assignTo,
      dueDate,
      checkLists,
    },
    { new: true }
  );

  const apiresponse = new ApiResponse(
    200,
    "Task updated successfully",
    true,
    task
  );
  res.status(200).json(apiresponse);
});

module.exports = editTask;
