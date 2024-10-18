const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: { type: String, enum: ["low", "moderate", "high"] },
    status: {
      type: String,
      enum: ["todo", "backlog", "inprogress", "done"],
      default: "todo",
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
