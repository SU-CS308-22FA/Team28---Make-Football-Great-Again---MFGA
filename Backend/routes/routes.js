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
router.route("/:id").get((req,res)=>{
  User.findById(req.params.id)
  .then(user=>res.json(user))
  .catch(err=>res.status(400).json("Error:"+err));
})
router.route("/delete/:id").delete((req,res)=>{
  User.findByIdAndDelete(req.params.id)
  .then(()=>res.json("User deleted."))
  .catch(err=>res.status(400).json("Error: "+err));
})
module.exports = router;