const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

//models-->
const taskModel = require("../../model/task.model.js");

const createTask = TryCatch(async (req, res, next) => {
  const { title, priority, assignTo, dueDate, checkLists } = req.body;
  const { _id } = req.user;

  //create task
  const task = await taskModel.create({
    title,
    priority,
    createdBy: _id,
    assignTo,
    dueDate,
    checkLists,
  });

  const apiresponse = new ApiResponse(
    200,
    "Task created successfully",
    true,
    task
  );
  res.status(200).json(apiresponse);
});

module.exports = createTask;
