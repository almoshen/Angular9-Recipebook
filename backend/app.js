const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const configRoutes = require("./routes");
const app = express();


//this is for heroku
let mongo_uri = process.env.MONGODB_URI;
if (mongo_uri == null || mongo_uri == "") {
  mongo_uri = 'mongodb://localhost/cs546group6recipebook';
}
//Mongoose connection
mongoose.connect(mongo_uri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(() => {
  console.log("Connected to database!");
})
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use("/images", express.static(path.join('backend/images')));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});


app.use(express.json());
configRoutes(app);


module.exports = app;
