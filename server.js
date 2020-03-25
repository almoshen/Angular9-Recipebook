const path = require("path");
const connection = require('./mongoConnection');
const express = require("express");
const app = express();
// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));



// Start the app by listening on the default Heroku port
// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
