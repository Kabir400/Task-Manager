//what we did-->

//1-->get start and end of the week
//2-->get all the tasks due is not exist or due date is within this week
//3-->get all the boards by checking assintTo equal to the user then populate to get the task assosiated with the task id and all the above filter is applied obiously
//4-->then concatinate the two arrays and send them to the response

const TryCatch = require("../../utils/TryCatch.js");
const ApiResponnse = require("../../utils/ApiResponse.js");
const { getStartOfWeek, getEndOfWeek } = require("../../utils/DateUtility.js");

//model
const taskModel = require("../../model/task.model.js");
const boardModel = require("../../model/board.model.js");

const getWeekTask = TryCatch(async (req, res, next) => {
  const { _id } = req.user;

  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek();

  //get week tasks-->
  const tasks = await taskModel.find({
    $or: [{ createdBy: _id }, { assignTo: _id }],

    $or: [
      { dueDate: { $gte: startOfWeek, $lte: endOfWeek } },
      { dueDate: { $exists: false } },
      { dueDate: null },
    ],
  });

  //get week boards
  const boards = await boardModel
    .find({
      assignTo: _id,
    })
    .populate({
      path: "taskId",
      match: {
        $or: [
          { dueDate: { $gte: startOfWeek, $lte: endOfWeek } },
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

  const apiresponse = new ApiResponnse(
    200,
    "Task fetched successfully",
    true,
    allTask
  );

  return res.status(apiresponse.status).json(apiresponse);
});

module.exports = getWeekTask;
