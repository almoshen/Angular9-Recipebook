const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const ctrlHome = require('../controllers/home');
const recipeRouter = require('./recipes');
const ingredientRouter = require('./ingredients');
const commentRouter = require('./comments');
const authMiddleware = require('../middleware/auth'); // check if a user is authenticated

// Users
router.get('/',ctrlHome.home);


// Users
router.post('/auth/registration',userRouter.usersCreate);

router.get('/auth/users',authMiddleware.checkIfAuthPrivate,userRouter.usersReadAll);
// router.get('/auth/users', userRouter.usersReadAll);

router.post('/auth/login',userRouter.usersReadOne);
router.post('/auth/logout',userRouter.userLogout);

/////// RECIPES
router.get('/recipes',recipeRouter.recipeReadAll);
router.get('/recipe/:key',recipeRouter.recipeReadOne);
router.post('/recipe',recipeRouter.recipeCreate);
router.patch('/recipe/:key',recipeRouter.recipeUpdate);

/////// INGREDIENTS
router.get('/ingredients',ingredientRouter.ingredientReadAll);
router.get('/ingredient/:key',ingredientRouter.ingredientReadOne);
router.post('/ingredient',ingredientRouter.ingredientCreate);

/////// COMMENTS
router.get('/comments',commentRouter.commentReadAll);
router.get('/comment/:key',commentRouter.commentReadOne);
router.post('/comment',commentRouter.commentCreate);


module.exports = router;
