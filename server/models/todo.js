const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    content: { type: String },
    file: { type: Array }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema); // creating the model from the schema

module.exports = { Todo };
