const { Router } = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const router = Router();

const authorizeUser = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.token = token;
  }
  next();
};

router.use(authorizeUser);

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
