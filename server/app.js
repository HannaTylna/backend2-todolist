const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { authorizeUser } = require("./middleware/auth");

const userRouter = require("./routers/user");
const todoRouter = require("./routers/todo");

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(authorizeUser);

app.use("/", userRouter);
app.use("/todo", todoRouter);

mongoose.connect(`mongodb://localhost/toDoList`);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
