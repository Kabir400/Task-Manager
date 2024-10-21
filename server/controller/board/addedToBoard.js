//what we did----->
// 1-->we are finding the user by email
// 2--> filter taskArr to avoid the extra entry (imagine the task is already assigned to a user and the we are assined our entire board to the same user so in that case a extra task will be added to the db)
// 3--> added the tasks to the board
//.............................................................

const TryCatch = require("../../utils/TryCatch.js");
const ApiResponnse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

//models
const boardModel = require("../../model/board.model.js");
const userModel = require("../../model/user.model.js");

//taskArr ex->
//[{taskId:"id",assignTo:"1",creatorId:"id"},{taskId:"id",assignTo:"id"}]

const addedToBoard = TryCatch(async (req, res, next) => {
  const { email, taskArr } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  const modifiedTaskArr = taskArr.filter((task, index) => {
    if (user._id.toString() != task.assignTo.toString()) {
      return true;
    }
  });

  const allBoard = modifiedTaskArr.map((task) => {
    return {
      taskId: task._id,
      creatorId: task.creatorId,
      assignTo: user._id,
    };
  });

  const board = await boardModel.insertMany(allBoard);

  const apiresponse = new ApiResponnse(
    200,
    "Board added successfully",
    true,
    board
  );
  res.status(200).json(apiresponse);
});
