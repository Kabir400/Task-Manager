const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models
const boardModel = require("../../model/board.model.js");
const userModel = require("../../model/user.model.js");

//taskArr ex->
//[{taskId:"id",assignTo:"1",creatorId:"id"},{taskId:"id",assignTo:"id"}]

const addedToBoard = TryCatch(async (req, res, next) => {
  const { email, taskArr } = req.body;
  const { email: userEmail } = req.user;

  if (email === userEmail) {
    return next(new ApiError(400, "You can't assign your board to yourself"));
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  // Check for existing tasks in the board for the user
  const existingTasks = await boardModel
    .find({ assignTo: user._id })
    .select("taskId");

  const existingTaskIds = existingTasks.map((task) => task.taskId.toString());

  // Check if the task is not assigned to the user and doesn't already exist in the board
  const newTasks = taskArr.filter((task) => {
    return (
      user._id.toString() !== task.assignTo &&
      !existingTaskIds.includes(task.taskId.toString())
    );
  });

  // Prepare tasks to be added to the board
  const allBoard = newTasks.map((task) => {
    return {
      taskId: task.taskId,
      creatorId: task.creatorId,
      assignTo: user._id,
    };
  });

  if (allBoard.length === 0) {
    return next(new ApiError(200, "No new tasks to add"));
  }

  // Insert the new tasks into the board
  const board = await boardModel.insertMany(allBoard);

  const apiResponse = new ApiResponse(
    200,
    "Board added successfully",
    true,
    board
  );
  res.status(200).json(apiResponse);
});

//can be fixed--->

// we are not checking for the case when user added someone to the board and that person added you so in this case you will have 2 same tasks in your board , but that is not our requirement so i did't implement it

//and also if you delete the shared board items you can't see them but it is still on the database bord collection, --> this two things can be fixed , but still that is not our requirement so i did't implement it

module.exports = addedToBoard;
