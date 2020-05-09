const path = require("path");
const express = require("express");
require('dotenv').config();
const app = express();
const configModules = require('./app_server/config');
const exphbs = require('express-handlebars');

const configRoutes = require('./app_server/routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

const cookieParser = require('cookie-parser');

var favicon = require('serve-favicon')

app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// configuration based on the MODE_ENV
configModules(app);
// HTTP Routes
configRoutes(app);

// Start the app by listening on the default Heroku port
// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});


module.exports = app;
