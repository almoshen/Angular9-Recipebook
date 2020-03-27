const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const recipeRoutes = require('./routes/recipes');
// const userRoutes = require('./routes/users');
const configRoutes = require("./routes");
const app = express();

// //this is for heroku
// let mongo_uri = process.env.MONGODB_URI;
// if (mongo_uri == null || mongo_uri == "") {
//   mongo_uri = 'mongodb://localhost/cs546group6recipebook';
// }
// //Mongoose connection
// mongoose.connect(mongo_uri,
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }).then(() => {
//   console.log("Connected to database!");
// })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

mongoose
  .connect(
    "mongodb+srv://Shen:" + process.env.MONGO_ATLAS_PW + "@cluster0-pasfy.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// app.use(express.static(__dirname + '/dist/cs546-group6-recipebook'));

app.use("/images", express.static(path.join('images')));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
configRoutes(app);
// app.use('/recipes', recipeRoutes);
// app.use('/users', userRoutes);
//
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/cs546-group6-recipebook/index.html'));
// });

module.exports = app;
