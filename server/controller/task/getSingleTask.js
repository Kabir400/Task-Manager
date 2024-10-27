const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

//models
const taskModel = require("../../model/task.model.js");

const getSingleTask = TryCatch(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await taskModel.findById(taskId);

  const apiresponse = new ApiResponse(
    200,
    "Task found successfully",
    true,
    task
  );
  res.status(200).json(apiresponse);
});

module.exports = getSingleTask;
