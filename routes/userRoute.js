const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const path = require('path');


router.post("/signup", (req, res) => {
  var { name, email, password, username } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !username) {
    res.json({ message: "Please add all data" });
  }
  User.findOne({ email: email })
  .then((savedUser) => {
    if (savedUser) {
      res.json({ message: "User already exists with that email" });
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
  
  


router.route("/edit").delete((req,res)=>{
  var email = req.body.email;
  console.log(req.body);
 
  User.findOneAndDelete({email:email},function(err,user){
    if(err){
      console.log(err)
    }
    else{
      res.json({message: "User is deleted"})
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

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;