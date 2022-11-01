const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const { MONGOURL } = require("./keys");


const PORT = 4000;

require('./models/user')

app.use(express.json())
app.use(cors())
app.use(require('./routes/routes'))

//connecting mongoose
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("ERROR !!!");
});


app.listen(PORT, () => {
  console.log("Server is successfully running on port: ", PORT);
});


