const mongoose = require("mongoose");
const moment = require("moment");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: String,
    immutable: true, //Immutable data cannot be changed once created
    default: () => moment().format("YYYY-MM-DD HH-MM-SS")
  },
  completed: {
    type: Boolean,
    default: false
    // type: [
    //   {
    //     type: String,
    //     enum: ["pending", "completed"]
    //   }
    // ],
    // default: ["pending"]
  }
});

const Todo = mongoose.model("Todo", todoSchema); // creating the model from the schema

module.exports = { Todo };
