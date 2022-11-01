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

router.route("/delete").delete((req,res)=>{
  var username = req.body.username;
  console.log(req.body);
 
  User.findOneAndDelete({username:username},function(err,user){
    if(err){
      console.log(err)
    }
    else{
      console.log("Deleted User: " + user);
    }
  });
  
})
module.exports = router;