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

router.get("/edit", (req,res) => {
  res.send("<h1>Edit Page</h1>");
})

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