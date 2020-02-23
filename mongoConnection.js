var mongoose = require('mongoose');
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;

// retrieved from https://devcenter.heroku.com/articles/nodejs-mongoose
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  mongoConfig.serverUrl + mongoConfig.database;

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
