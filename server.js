const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const { MONGOURL } = require("./config/index");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// require db connection
require("./models/user");
require("./models/player");
require("./models/team");
require("./models/stat")
require("./models/recentMatch")
require("./models/nextMatch")
require("./models/referee");
require("./models/post")
require("./models/rating");
require("./models/award");


//cookie handling
app.use(cookieParser())
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

const routes = require("./routes/user/userRoute");
const statRoute = require('./routes/stat/statRoute')
const recentMatch = require('./routes/recentMatchRoute/recentMatchRoute')
const refereeRoutes = require("./routes/refereeRoute");
const postRoute = require("./routes/posts/postRoute")

const nextMatch = require("./routes/nextMatch/nextMatchesRoute")
const award = require("./routes/awards/awardsRoute")
const path = require('path');
const swaggerJSDOC = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition:{
    openapi: '3.0.0',
    info:{
      title:'MFGA',
      version:'1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:4000/'
      }
    ],
    
  },
  apis:['./routes/*.js']
}
const swaggerSpec = swaggerJSDOC(options)
//Web scrapping
// require("./web/scraping")
require("./web-scraping/teamPlayers")
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
// require('./web-scraping/newsScraper/scrapeNews')
//require('./web-scraping/newsScraper/scrapeTffNews')

app.use(express.static('client/build'));

// routes
app.use('/api', postRoute);
app.use('/api', award);
app.use(refereeRoutes);
app.use(nextMatch);
app.use('/recentmatch', recentMatch)
app.use("/stat", statRoute)
app.use( routes);
//app.use(refereeRoutes);
//const __dirname = path.resolve();
app.use(express.static(path.join(path.resolve(), "/client/build")));
app.get("*", (req, res)=>
  res.sendFile(path.resolve(path.resolve(), "client", "build", "index.html"))
);
/*
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/
mongoose.connect(process.env.MONGODB_URI || MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("ERROR !!!");
});

// app.get("/test", (req, res) => {
//   res.send("asdasdasdas")
// })

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
