var mongoose = require('mongoose');
require('dotenv').config();
// const settings = require("../../app_server/settings.json");
// const mongoConfig = settings.mongoConfig;

// retrieved from https://devcenter.heroku.com/articles/nodejs-mongoose
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGODB_URI;

const host = process.env.DB_HOST || '127.0.0.1'

const readLine = require('readline');

// Retrieved from eBook Getting MEAN Second Edition
const connect = () => {
  setTimeout(() => mongoose.connect(uristring, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology:true
    }), 1000);
}

mongoose.connection.on('connected', () => {
  console.log(`connected to ${uristring}`);
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();

require('./users');
require('./recipes');
require('./ingredients');
require('./comments');
