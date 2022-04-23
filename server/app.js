const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { authorizeUser } = require("./middleware/auth");
const fileUpload = require("express-fileupload");
const path = require("path");

const userRouter = require("./routers/user");
const todoRouter = require("./routers/todo");

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(authorizeUser);
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/todos", todoRouter);

mongoose.connect(`mongodb://localhost/toDoList`);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
