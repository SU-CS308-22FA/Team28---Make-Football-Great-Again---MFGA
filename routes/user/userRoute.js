const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const auth = require('../../middleware/auth');
const secretKey = "SecretKey123"

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Player = mongoose.model("Player");
// const Stat = mongoose.model("Stat")






router.post("/signup", (req, res) => {
  var { name, email, password, username,role,status} = req.body;
  console.log(req.body);
  if (!name || !email || !password || !username) {
    res.json({ message: "Please add all data" });
  }
  bcrypt.hash(password,12)
  .then((hashedpw) => {  
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        res.json({ message: "User already exists with that email" });
      }
      const user = new User({
        email,
        password:hashedpw,
        name,
        username,
        role,
        status
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
  })
});

router.route('/admin').get((req,res)=>{
   User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/admin/:id", (req,res)=>{
  var email = req.body.email;
  User.findOne({email:email})
  .then(user =>{
    user.status = 0;

      user.save()
      .then(()=>res.json('User banned!'))
      .catch(err => res.status(400).json('Error: '+err));

});
});

router.post("/admin/banned/:id", (req,res)=>{
  var email = req.body.email;
  User.findOne({email:email})
  .then(user =>{
    user.status = 1;

      user.save()
      .then(()=>res.json('User activated!'))
      .catch(err => res.status(400).json('Error: '+err));

});
});





router.post("/admin", (req, res) => {
  var { name, email, password, username,role,status } = req.body;
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
      status,
      role
    });
    user.save()
    .then((user) => {
      res.json({ message: "Saved successfully"});
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
        res.json({ message: "There is no user exist with this email and password" });
      } 
      bcrypt.compare(password,foundUser.password)
      .then(match => {
        if (match) {
          if(foundUser.status === 0){
            res.json({ message: "User has been banned" });
          }
          const token = jwt.sign(
            {
              user: foundUser._id,
            },
            secretKey,
            { expiresIn: "24h", algorithm: 'HS256'}
          )
          /*
          res.json({
            message: "Login Successful",
            email: foundUser.email,
            id: foundUser._id,
            name: foundUser.name,
            user: foundUser,
            _token: token
          });*/
          console.log(token);
          //res.json(foundUser);
          res.cookie("token", token, {
            httpOnly: true,
          })
          res.send({
          message: "Login Successful",
          email: foundUser.email,
          id: foundUser._id,
          name: foundUser.name,
          user: foundUser,
          });
          //res.json(foundUser);
        } 
        else {
          res.json({ message: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log("There is an error")
      })
  })
});

  /*
  router.post("/login", (req, res) => {
    var { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(422).json({ error: "Add all data" });
    }
    User.findOne({ email: email })
      .then((foundUser) => {
        if (!foundUser) {
          res.json({ message: "There is no user exist with this email and password" });
        } 
        else {
          if(foundUser.status === 0){
            res.json({ message: "User has been banned" });
          }
          else if (foundUser.password === password) {
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
  */
  
  router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  });

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const verified = jwt.verify(token, secretKey);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

router.route("/edit").delete(auth, (req,res)=>{
  var email = req.body.email;
  console.log(req.body);
 
  User.findOneAndDelete({email:email},function(err,user){
    if(err){
      console.log(err)
    }
    else{
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
      }).send({message: "User is deleted"});
      //res.json({message: "User is deleted"})
      console.log("Deleted User: " + user);
    }
  });
})

router.route('/edit').post(auth, (req,res)=>{
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

router.route('/teams').get((req,res)=>{
  Player.find()
 .then(players => res.json(players))
 .catch(err => res.status(400).json('Error: ' + err));
});





router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


module.exports = router;