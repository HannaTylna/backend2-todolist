const { Router } = require("express");
const { User } = require("../models/user");
const { createUserToken } = require("../utils/auth");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    const user = await newUser.save();

    res.json(user);
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).json("User is already in the system");
    } else {
      res.status(500).json("Internal server error");
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);

    if (user) {
      const token = createUserToken(user);
      return res.json({ token, username });
    } else {
      res.sendStatus(401).json("Wrong credentials!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const currentUser = req.user;
  const { userId } = currentUser;
  const user = await User.findOne({ _id: userId });
  if (user) {
    res.json({
      user
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
