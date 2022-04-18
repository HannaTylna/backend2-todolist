const mongoose = require("mongoose");
const moment = require("moment");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    immutable: true, //Immutable data cannot be changed once created
    default: () => moment().format("YYYY-MM-DD HH-MM-SS")
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Todo = mongoose.model("Todo", todoSchema); // creating the model from the schema

module.exports = { Todo };
