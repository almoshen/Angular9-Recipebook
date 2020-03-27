const recipeRoutes = require('./recipes');
const userRoutes = require('./users');
const path = require('path');


const constructorMethod = (app) => {



  app.use('/recipes', recipeRoutes);
  app.use('/users', userRoutes);
  app.use((req, res) => {
  res.sendFile(path.join(__dirname + '/dist/cs546-group6-recipebook/index.html'));
});
};
module.exports = constructorMethod;
