//what we did-->
//1-->get start and end of the week
//2-->get all the tasks due is not exist or due date is within this week
//3-->get all the boards by checking assintTo equal to the user then populate to get the task assosiated with the task id and all the above filter is applied obiously
//4-->then concatinate the two arrays and send them to the response

const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const { getStartOfWeek, getEndOfWeek } = require("../../utils/DateUtility.js");

// Models
const taskModel = require("../../model/task.model.js");
const boardModel = require("../../model/board.model.js");

const getWeekTask = TryCatch(async (req, res, next) => {
  const { _id, name } = req.user;

  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek();

  // 1. Fetch tasks assigned to the user directly
  const userTasks = await taskModel.find({
    $and: [
      { $or: [{ createdBy: _id }, { assignTo: _id }] },
      {
        $or: [
          { dueDate: { $gte: startOfWeek, $lte: endOfWeek } },
          { dueDate: { $exists: false } },
          { dueDate: null },
        ],
      },
    ],
  });

  // 2. Fetch boards shared with the user and populate their tasks
  const sharedBoards = await boardModel.find({ assignTo: _id }).populate({
    path: "taskId",
    match: {
      $or: [
        { dueDate: { $gte: startOfWeek, $lte: endOfWeek } },
        { dueDate: { $exists: false } },
        { dueDate: null },
      ],
    },
  });

  // 3. Collect all tasks from shared boards
  let boardTasks = [];
  sharedBoards.forEach((board) => {
    if (board.taskId) {
      boardTasks.push(board.taskId);
    }
  });

  // 4. Combine user tasks and board tasks
  const allTasks = [...userTasks, ...boardTasks.flat()];

  // 5. Respond with all tasks for the user
  const apiResponse = new ApiResponse(200, "Tasks fetched successfully", true, {
    tasks: allTasks,
    name,
    _id,
  });

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = getWeekTask;
