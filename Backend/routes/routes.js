const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
  });

router.get("/signup", (req, res) => {
  res.send("<h1>Sign-up Page</h1>");
});

router.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1>");
});

router.post("/signup", (req, res) => {
  var { name, email, password, username } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !username) {
    return res.status(422).json({ error: "Add all data" });
  }
  User.findOne({ email: email })
  .then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
    const user = new User({
      email,
      password,
      name,
      username,
    });
    user.save()
    .then((user) => {
      res.json({ message: "Saved successfully" });
      console.log(user.email);
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
});


router.post("/login", (req, res) => {
  var { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(422).json({ error: "Add all data" });
  }
  User.findOne({ email: email })
    .then((foundUser) => {
      if (!foundUser) {
        return res
          .status(422)
          .json({ error: "User does not exists with that email" });
      } else {
        if (foundUser.password === password) {
          res.json({ message: "Loged in successfully" });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/edit", (req, res) => {
  const newusername = req.body.username;
  const id = req.body.id;
  try{
    User.findById(id,( updatedUser)=> {
      updatedUser.username = newusername;
      updatedUser.save();
    })
  }
  catch{}
});

module.exports = router;