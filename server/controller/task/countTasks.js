const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models
const taskModel = require("../../model/task.model.js");
const boardModel = require("../../model/board.model.js");

const countTasks = TryCatch(async (req, res, next) => {
  const countObj = {
    backlog: 0,
    done: 0,
    progress: 0,
    todo: 0,
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDateTask: 0,
  };

  const { _id } = req.user;

  const tasks = await taskModel.find({
    $or: [{ createdBy: _id }, { assignTo: _id }],
  });
  const boards = await boardModel.find({ assignTo: _id }).populate("taskId");

  const boardFormated = boards.map((board) => board.taskId);

  const allTasks = [...tasks, ...boardFormated];

  allTasks.forEach((task) => {
    if (task.dueDate) {
      countObj.dueDateTask++;
    }
    if (task.priority === "LOW PRIORITY") {
      countObj.lowPriority++;
    } else if (task.priority === "MODERATE PRIORITY") {
      countObj.moderatePriority++;
    } else if (task.priority === "HIGH PRIORITY") {
      countObj.highPriority++;
    }
    if (task.status === "BACKLOG") {
      countObj.backlog++;
    } else if (task.status === "PROGRESS") {
      countObj.progress++;
    } else if (task.status === "DONE") {
      countObj.done++;
    } else if (task.status === "TO-DO") {
      countObj.todo++;
    }
  });

  const apiresponse = new ApiResponse(
    200,
    "Tasks counted successfully",
    true,
    countObj
  );
  res.status(200).json(apiresponse);
});

module.exports = countTasks;
