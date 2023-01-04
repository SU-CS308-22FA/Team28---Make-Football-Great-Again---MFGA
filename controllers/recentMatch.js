const mongoose = require("mongoose");
const Recent = mongoose.model("Recent");

module.exports = {
  recent: async (req, res) => {
    var { skor, date, away, home } = req.body;

    console.log(req.body);

    //res.send("asasasasdasda")
    // await Recent.remove({});

    await Recent.findOne({ date: date, home: home, away: away })
      .then(async (foundMatch) => {
        if (foundMatch) {
          console.log(foundMatch);
          foundMatch
            .updateOne({
              $set: {
                ...req.body,
              },
            })
            .then(() => {
              res.status(200).json({
                message: "Stat Updated",
              });
            })
            .catch((e) => {
              res.status(500).json({
                message: e,
              });
            });
          //res.status(403).json({ message: "stat already exists" });
        } else {
          //Match is not found

          if(skor === "undefined-undefined") {
            skor = "not played";
          }

          const recentMatch = new Recent({
            skor,
            date,
            away,
            home,
          });

          await recentMatch
            .save()
            .then((rec) => {
              // console.log(rec);
              res.status(200).json({
                message: "Recent match is successfully saved",
                rec: rec,
              });
            })
            .catch((e) => {
              res.status(500).json({ message: e });
            });
        }
      })
      .catch((e) => {
        res.json({
          message: e,
        });
      });
  },

  getRecent: (req, res) => {
    // res.send("dsfsdfds")

    Recent.find()
    .then(data => {

      // console.log(data.slice(0,1))
      
      res.json(data.slice(0,7))
    })
    .catch(error => res.json(error))
  },
};
