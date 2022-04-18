const { Router } = require("express");
const { User } = require("../models/user");
const { createUserToken } = require("../utils/auth");

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body.user;
    const user = await User.login(username, password);

    if (user) {
      const token = createUserToken(user);
      return res.json({ user: { token, username } });
    } else {
      res.sendStatus(401).json("Wrong credentials!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body.user;
    const user = new User({ username, password });
    const createdUser = await user.save();
    const token = createUserToken(createdUser);

    res.json({ user: { username: createdUser.username, token } });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).json("User is already in the system");
    } else {
      res.status(500).json("Internal server error");
    }
  }
});

router.get("/", async (req, res) => {
  const user = req.user;
  const { userId } = user;
  console.log(userId);
  const databaseUser = await User.findOne({ _id: userId });
  if (user) {
    res.json({
      user: { username: databaseUser.username, token: req.token }
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
