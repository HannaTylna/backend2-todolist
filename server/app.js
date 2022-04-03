const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 8000;

// app.use(cors());

// app.post("/login", (req, res) => {
//   res.send({
//     token: "test123"
//   });
// });

const jwt = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.token = token;
  }
  next();
};

app.use(
  cors()
  //   {
  //   origin: ["http://localhost:3000"],
  //   methods: [“GET”, “POST”],
  //   credentials: true,
  // }
);
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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.login(username, password);
  if (user) {
    const token = createUserToken(user);
    return res.json({ user: user, token: token });
  } else {
    res.sendStatus(404);
  }
});

app.get("/login", async (req, res) => {
  const user = req.body;
  const username = user.username;
  const currentUser = await User.findOne({ username: username });

  res.json({ user: currentUser });
});

app.put("/logout", authorizeUser, async (req, res) => {
  const authHeader = req.headers["Authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.json("You have been logged out!");
    } else {
      res.sendStatus(404);
    }
  });
});

mongoose.connect(`mongodb://localhost/toDoList`);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
