const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const {
  getStartOfToday,
  getEndOfToday,
} = require("../../utils/DateUtility.js");

// Models
const taskModel = require("../../model/task.model.js");
const boardModel = require("../../model/board.model.js");

const getTodayTask = TryCatch(async (req, res, next) => {
  const { _id, name } = req.user;

  const startOfDay = getStartOfToday();
  const endOfDay = getEndOfToday();

  // Fetch today's tasks assigned to the user directly
  const userTasks = await taskModel.find({
    $and: [
      { $or: [{ createdBy: _id }, { assignTo: _id }] },
      {
        $or: [
          { dueDate: { $gte: startOfDay, $lte: endOfDay } },
          { dueDate: { $exists: false } },
          { dueDate: null },
        ],
      },
    ],
  });

  // Fetch boards shared with the user and populate their tasks for today
  const sharedBoards = await boardModel.find({ assignTo: _id }).populate({
    path: "taskId",
    match: {
      $or: [
        { dueDate: { $gte: startOfDay, $lte: endOfDay } },
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
    "Today's tasks fetched successfully",
    true,
    {
      tasks: allTasks,
      name,
      _id,
    }
  );

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = getTodayTask;
