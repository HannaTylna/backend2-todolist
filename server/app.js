const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
const PORT = 3000;

const jwt = require("jsonwebtoken");

app.use(express.json());

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  const createUser = await user.save();
  const token = createUserToken(createUser);

  res.json({ user: user, token: token });
});

const createUserToken = user => {
  const userId = user._id.toString();
  return (token = jwt.sign(
    { userId, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "24 h", subject: userId }
  ));
};

mongoose.connect(`mongodb://localhost/toDoList`);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
