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

router.route("/edit").delete((req,res)=>{
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
router.route('/edit').post((req,res)=>{ //I think this should be a post method but the youtuber did it post I will do research about it
  var email = req.body.email;
  User.findOne({email:email})
  .then(user =>{
    user.username = req.body.username;
    user.password = req.body.password;
    user.name = req.body.name;

      user.save()
      .then(()=>res.json('User updated!'))
      .catch(err => res.status(400).json('Error: '+err));

});

})

module.exports = router;