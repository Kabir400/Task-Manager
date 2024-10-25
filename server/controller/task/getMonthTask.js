const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const {
  getStartOfMonth,
  getEndOfMonth,
} = require("../../utils/DateUtility.js");

// Models
const taskModel = require("../../model/task.model.js");
const boardModel = require("../../model/board.model.js");

const getMonthTask = TryCatch(async (req, res, next) => {
  const { _id, name } = req.user;

  const startOfMonth = getStartOfMonth();
  const endOfMonth = getEndOfMonth();

  // Fetch tasks for the month assigned to the user directly
  const userTasks = await taskModel.find({
    $and: [
      { $or: [{ createdBy: _id }, { assignTo: _id }] },
      {
        $or: [
          { dueDate: { $gte: startOfMonth, $lte: endOfMonth } },
          { dueDate: { $exists: false } },
          { dueDate: null },
        ],
      },
    ],
  });

  // Fetch boards shared with the user and populate their tasks for the month
  const sharedBoards = await boardModel.find({ assignTo: _id }).populate({
    path: "taskId",
    match: {
      $or: [
        { dueDate: { $gte: startOfMonth, $lte: endOfMonth } },
        { dueDate: { $exists: false } },
        { dueDate: null },
      ],
    },
  });

  // Collect all tasks from shared boards
  let boardTasks = [];
  sharedBoards.forEach((board) => {
    if (board.taskId) {
      boardTasks.push(board.taskId);
    }
  });

  // Combine user tasks and board tasks
  const allTasks = [...userTasks, ...boardTasks.flat()];

  // Respond with all tasks for the user
  const apiResponse = new ApiResponse(
    200,
    "Monthly tasks fetched successfully",
    true,
    {
      tasks: allTasks,
      name,
      _id,
    }
  );

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = getMonthTask;
