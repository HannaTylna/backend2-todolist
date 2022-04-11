const { Router } = require("express");
const { User } = require("../models/user");
const { Todo } = require("../models/todo");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.json({ todos });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to get todo");
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.json({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something is wrong");
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
