const TryCatch = require("../../utils/TryCatch.js");
const ApiResponnse = require("../../utils/ApiResponse.js");
const {
  getStartOfToday,
  getEndOfToday,
} = require("../../utils/DateUtility.js");

//model
const taskModel = require("../../model/task.model.js");
const boardModel = require("../../model/board.model.js");

const getTodayTask = TryCatch(async (req, res, next) => {
  const { _id, name } = req.user;

  const startOfDay = getStartOfToday();
  const endOfDay = getEndOfToday();

  //get today tasks-->
  const tasks = await taskModel.find({
    $or: [{ createdBy: _id }, { assignTo: _id }],

    $or: [
      { dueDate: { $gte: startOfDay, $lte: endOfDay } },
      { dueDate: { $exists: false } },
      { dueDate: null },
    ],
  });

  //get today boards
  const boards = await boardModel
    .find({
      assignTo: _id,
    })
    .populate({
      path: "taskId",
      match: {
        $or: [
          { dueDate: { $gte: startOfDay, $lte: endOfDay } },
          { dueDate: { $exists: false } },
          { dueDate: null },
        ],
      },
    });

  //collecting all the task form the board array
  let boardTasks = [];
  boards.forEach((board) => {
    if (board.taskId) {
      boardTasks.push(board.taskId);
    }
  });

  //concatinate the two arrays
  const allTask = [...tasks, ...boardTasks.flat()];

  const apiresponse = new ApiResponnse(200, "Task fetched successfully", true, {
    tasks: allTask,
    name,
  });

  return res.status(apiresponse.status).json(apiresponse);
});

module.exports = getTodayTask;
