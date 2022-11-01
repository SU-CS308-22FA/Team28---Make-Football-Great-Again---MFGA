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
  })
});

  
  router.post("/login", (req, res) => {
    var { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(422).json({ error: "Add all data" });
      // res.send("Please fill all your information")
    }
    User.findOne({ email: email })
      .then((foundUser) => {
        if (!foundUser) {
          // return res
          //   .status(404)
          //   .json({ error: "User does not exists with that email" });
          res.json({ message: "There is no user exist with this email and password" });
        } else {
          if (foundUser.password === password) {
            res.json(foundUser);
          } else {
            // return res.status(422).json({ error: "Invalid email or password" });
            res.json({ message: "Invalid email or password" });
          }
        }
      })
      .catch((err) => {
        console.log("There is an error")
      });
  });
  
  module.exports = router;

