const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "task", required: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  assignTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const boardModel = mongoose.model("board", boardSchema);

module.exports = boardModel;
