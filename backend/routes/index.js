const recipeRoutes = require('./recipes');
const userRoutes = require('./users');
const listRoutes = require('./grocerylist');
const path = require('path');


const constructorMethod = (app) => {



  app.use('/recipes', recipeRoutes);
  app.use('/users', userRoutes);
  app.use('/lists', listRoutes);
  app.get('*', (req, res) => {
    res.sendStatus(404);
});
};
module.exports = constructorMethod;
