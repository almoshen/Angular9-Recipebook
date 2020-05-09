const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

//get lists of all recipes
router.get('/list',recipeController.recipeReadAll);
//create new recipes
router.get('/new',recipeController.recipeNew);
// shows details about a specific recipe
router.get('/detail/:key/list', recipeController.recipeListDetail);
// change the details about a specific recipe
router.get('/detail/:key/edit', recipeController.recipeEditDetail);

module.exports = router;
