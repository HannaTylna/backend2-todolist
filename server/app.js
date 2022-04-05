const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/auth");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use("/", authRouter);
mongoose.connect(`mongodb://localhost/toDoList`);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
