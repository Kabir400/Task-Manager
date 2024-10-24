const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models-->
const taskModel = require("../../model/task.model.js");

const editStatus = TryCatch(async (req, res, next) => {
  const { status, taskId } = req.body;

  //create task
  const task = await taskModel.findByIdAndUpdate(
    taskId,
    {
      status,
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

module.exports = editStatus;
