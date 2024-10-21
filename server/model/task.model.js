const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW PRIORITY", "MODERATE PRIORITY", "HIGH PRIORITY"],
    },
    status: {
      type: String,
      enum: ["TO-DO", "BACKLOG", "PROGRESS", "DONE"],
      default: "TO-DO",
    },

    checkLists: [
      {
        title: { type: String, required: true },
        status: { type: Boolean, default: false },
      },
    ],
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
