const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const secretKey = "SecretKey123"
const Team = mongoose.model("Team");

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
        status,
        team: ""
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

router.route('/api/admin').get((req,res)=>{
   User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/api/admin/:id", (req,res)=>{
  var email = req.body.email;
  User.findOne({email:email})
  .then(user =>{
    user.status = 0;

      user.save()
      .then(()=>res.json('User banned!'))
      .catch(err => res.status(400).json('Error: '+err));

});
});

router.post("/api/admin/banned/:id", (req,res)=>{
  var email = req.body.email;
  User.findOne({email:email})
  .then(user =>{
    user.status = 1;

      user.save()
      .then(()=>res.json('User activated!'))
      .catch(err => res.status(400).json('Error: '+err));

});
});





router.post("/api/admin", (req, res) => {
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
        status,
        team: ""
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
    //const updatedHashedPw = bcrypt.hash(req.body.password,12)
    user.username = req.body.username;
    user.password = req.body.password;
    user.name = req.body.name;
    
      user.save()
      .then(()=>res.json('User updated!'))
      .catch(err => res.status(400).json('Error: '+err));
  });
})



const axios = require("axios");
const cheerio = require("cheerio");
const GalatasarayUrl = "https://www.transfermarkt.com/fenerbahce-istanbul/startseite/verein/36"
const galatasaray_kadro_data = []
async function getGalatarasayKadro(url){

  try{
      const response = await axios.get(url);
      const $=cheerio.load(response.data)
      const kadro = $("tr");
      kadro.each(function(){
          const pname= $(this).find(".hide").text();
          const position= $(this).find("tr:nth-child(2) td").text();
          const birth= $(this).find("td:nth-child(4)").text();
         if(pname.length > 1)
   {
          galatasaray_kadro_data.push({pname,position,birth});
          Player.findOne({name: pname})
      .then((foundUser)=> 
      {
        if (!foundUser) {
          const pl = new Player({
            name: pname,
            position: position,
            birth: birth,
            team: "Fenerbahce"
          })
          pl.save()
                        }
     })
    }
                          });
      
     }
  catch(err){
      console.log(err);
  }
}
getGalatarasayKadro(GalatasarayUrl);

const turl = "https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-s%C3%BCper-lig/482ofyysbdbeoxauk19yg7tdt"
const all_teams = []

async function getKadro(turl){

    try{
        const response = await axios.get(turl);
        const $=cheerio.load(response.data)
        const tr = $("tr");

        tr.each(function(){
            teamname= $(this).find(".rupclose , .p0c-competition-tables__team-name--full").text();
           if(teamname.length > 1){
            all_teams.push({teamname});
            
           }
           

        });
        //console.log(all_teams);
        all_teams.forEach(element => {
          Team.findOne()
            .then((foundUser)=> 
            {
              if (!foundUser) {
                const teams = new Team({
                  name: element.teamname,
                })
                
                teams.save()
                              }
           })
        });
           

    }
    catch(err){
        console.log(err);
    }
}

getKadro(turl);


router.route('/teams/:team').get((req,res)=>{
  Player.find()
 .then(players => res.json(players))
 .catch(err => res.status(400).json('Error: ' + err));
});


router.post("/profile", (req,res)=>{
  var team = req.body.team;
  var email = req.body.email;
  User.findOne({email:email})
  .then(user =>{
    user.team = team;

      user.save()
      .then(()=>res.json('Team Selected!'))
      .catch(err => res.status(400).json('Error: '+err));

});
});

router.route('/profile').get((req,res)=>{
  Team.find()
 .then(teams => res.json(teams))
 .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/getPoints').post((req, res) =>{
  const {email} = req.body
  User.findOne({email: email})
  .then((user)=>{
    res.json((user != null  ? user.points : 0))
  })
  .catch((err)=>{
    console.log(err);
});

})



module.exports = router;