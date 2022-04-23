const { Router } = require("express");
const { User } = require("../models/user");
const { Todo } = require("../models/todo");
const { requireLogin } = require("./user");
const multer = require("multer");
const uuidv4 = require("uuid/v4");

const router = Router();

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + fileName);
  }
});
const upload = multer({ storage: storage });

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
    const todos = await Todo.find({
      createdBy: userId,
      isCompleted: false
    })
      .sort({ createdAt: -1 })
      .populate("createdBy")
      .exec();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send("Failed to get todo");
  }
});

router.get("/completed", async (req, res) => {
  const userId = req.user.userId;
  try {
    const todos = await Todo.find({
      createdBy: userId,
      isCompleted: true
    })
      .sort({ createdAt: -1 })
      .populate("createdBy")
      .exec();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send("Failed to get todo");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.find({ _id: id });
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something is wrong");
  }
});

//router.post("/:id/upload", async (req, res) => {});
router.post("/:id/upload", upload.array("file"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    file: url + "/public/" + req.file.filename
  });
  todo
    .save()
    .then(result => {
      res.status(201).json({
        message: "User registered successfully!",
        todoCreated: {
          _id: result._id,
          file: result.profileImg
        }
      });
    })
    .catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    });
});
// router.get("/:id/upload", (req, res, next) => {
//   Todo.find().then(data => {
//     res.status(200).json({
//       message: "User list retrieved successfully!",
//       users: data
//     });
//   });
// });

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { task, content, file } = req.body;
  await Todo.findOneAndUpdate(
    { _id: id },
    { $set: { file: file, task: task, content: content } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
  res.json("Successfully");
});

router.put("/:id/isCompleted", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  try {
    const todo = await Todo.findOne({ _id: id });
    todo.isCompleted = !todo.isCompleted;

    if (todo.createdBy.toString() === userId) {
      try {
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only update your tasks!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  try {
    if (userId) {
      const deletedTodo = await Todo.deleteOne({
        _id: id
      });
    }
    res.json("Successfully deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
