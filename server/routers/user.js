const { Router } = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  const createUser = await user.save();
  const token = createUserToken(createUser);

  res.json({ user: user, token: token });
});

const createUserToken = user => {
  const userId = user._id.toString();
  return (token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "24 h",
    subject: userId
  }));
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.login(username, password);

  if (user) {
    const token = createUserToken(user);
    return res.json({ user: user, token: token });
  } else {
    res.sendStatus(401);
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(400);
  }
});

router.get("/logout", async (req, res) => {
  const authHeader = req.header("Authorization");
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.json("You have been logged out!");
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
