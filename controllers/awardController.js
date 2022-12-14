const mongoose = require("mongoose");
const Awards = mongoose.model("Awards");
const User = mongoose.model("User");


module.exports = {
    publishAward: async (req, res) => {
        var {title, description, image, pointsNeeded} = req.body
        const award = new Awards({
        title, 
        description, 
        image, 
        pointsNeeded
        });
        await award
        .save()
        .then((award) => {
            res.json({ message: "Award created successfully" });
            // console.log(post.email);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    currentAward: async (req, res) =>{
        Awards.findOne({status: 1})
        .then((award) => {
            res.json(award)
        })
        .catch((err) => {
            console.log(err);
        });
    },
    oldAwards: async (req, res) =>{
        Awards.find({status: 0})
        .then((award) => {
            res.json(award)
        })
        .catch((err) => {
            console.log(err);
        });
    },

    finishApplication: async (req, res) =>{
        var {id} = req.body
        var winner;
        var wonAward;
        Awards.findById(id)
        .then((award)=>{
            wonAward = award
            if(award.applied.length != 0){
                winner = award.applied[Math.floor(Math.random() * (award.applied.length))];
                Awards.findByIdAndUpdate(id, {$set: {winner: winner, status: 0}})
                .catch((err) => {
                    res.json(err)
                });

                User.findOneAndUpdate({email: winner}, {$push: {awards: wonAward}})
                .catch((err) => {
                    res.json(err)
                });
                res.json(winner)
            }
            else{
                Awards.findByIdAndUpdate(id, {$set: {status: 0}})
                .catch((err) => {
                    res.json(err)
                });
                res.json({message: "No application"})
            }
        })
        .catch((err) => {
            res.json(err);
        });
        

    },

    applyAward: async (req, res) => {
        const {email} = req.body
        try{
            await Awards.findOneAndUpdate({status: 1}, {$push: {applied: email}})
            .then(async (award)=>{
                const point = award.pointsNeeded
                try{
                    await User.findOneAndUpdate({email: email}, {$inc: {points: -point}})
                    res.json({message: "Successfully applied to award"})
                }
                catch{(err) => {
                    res.json(err)
                }}
            })
        }
        catch{(err) => {
            res.json(err)
        }}
    },

    unapplyAward: async (req, res) => {
        const {email} = req.body
        try{
            await Awards.findOneAndUpdate({status: 1}, {$pull: {applied: email}})
            .then(async (award)=>{
                const point = award.pointsNeeded
                try{
                    await User.findOneAndUpdate({email: email}, {$inc: {points: point}})
                    res.json({message: "Successfully unapplied to award"})
                }
                catch{(err) => {
                    res.json(err)
                }}
            })
        }
        catch{(err) => {
            res.json(err)
        }}
    },

    isApplied: async (req, res) => {
        const {email} = req.body
        try{
            await Awards.findOne({status: 1})
            .then((award)=>{
                if(award.applied.indexOf(email) != -1){
                    res.json(true)
                }
                else(res.json(false))
            })
            .catch((err) => {
                res.json(err)
            })
        }
        catch{(err) => {
            res.json(err)
        }}
    }
};