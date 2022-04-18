const { Router } = require("express");
const { User } = require("../models/user");
const { Todo } = require("../models/todo");
const { requireLogin } = require("./user");

const router = Router();

router.post("/", async (req, res) => {
  const { userId } = req.user;
  const task = req.body.task;
  const todo = new Todo({ createdBy: userId, task });
  try {
    const savedTask = await todo.save();
    res.status(200).json({ task: savedTask });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something is wrong");
  }
});

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  try {
    const todos = await Todo.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .populate("createdBy")
      .exec();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send("Failed to get todo");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const todo = await Todo.find({ _id: id });
    res.json({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something is wrong");
  }
});

router.put("/:id", async (req, res) => {});
module.exports = router;
