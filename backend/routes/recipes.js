const express = require("express");
const router = express.Router();
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const multer = require('multer');

const checkAuth = require('../auth/check-auth');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth,
  multer({storage: storage}).single("image"), (req,res) => {
  const url = req.protocol + '://' + req.get("host");
  let ingredient = JSON.parse(req.body.ingredients);
  const recipe = new Recipe({
    title: req.body.title,
    instructions: req.body.instructions,
    imagePath: url + "/images/" + req.file.filename,
    ingredients: ingredient,
    user: req.userData.userId,
    username: req.userData.username,
    comments: [],
    likes: '0'
  });
  recipe.save().then(createdRecipe => {
    res.status(201).json({
      recipe: {
        id: createdRecipe._id,
        title: createdRecipe.title,
        instructions: createdRecipe.instructionFn,
        imagePath: createdRecipe.imagePath,
        ingredients: createdRecipe.ingredients,
        user: createdRecipe.user,
        username: createdRecipe.username,
        comments: [],
        likes: '0'
      }
    });
  });
});

router.put('/:id', checkAuth, multer({ storage: storage }).single("image"), (req, res) => {
  let imagePath= req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  let ingredients = JSON.parse(req.body.ingredients);
  let comments = JSON.parse(req.body.comments);
  let commentsInRecipe;
  // Recipe.findOne({_id: req.body.id}, function(err, recipe) {
  //   if(err) throw err;
  //   console.log(recipe.comments);
  //   commentsInRecipe = recipe.comments;
  // });
  const recipe = new Recipe({
    _id: req.body.id,
    title: req.body.title,
    instructions: req.body.instructions,
    imagePath: imagePath,
    ingredients: ingredients,
    user: req.userData.user,
    username: req.userData.username,
    comments: comments,
    likes: req.body.likes
  });
  Recipe.updateOne({_id: req.params.id, user: req.userData.userId}, recipe).then(result => {
    if( result.nModified <= 0) {
      res.status(401).json({ message: "User not authorized" });
    }
    res.status(200).json({message: 'Update successful'})
  })
});

router.patch('/:id', (req, res) => {
  console.log("patch likes: " + JSON.stringify(req.body.likes));
  console.log(req.params.id);
  Recipe.updateOne({_id: req.params.id}, {$set: {likes: JSON.stringify(req.body.likes)}}).then(result => {
    if( result.nModified <= 0) {
      res.status(401).json({ message: "Update likes failed" });
    }
    res.status(200).json({message: 'Update successful'})
  })
});

router.get('', (req,res) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const recipeQuery = Recipe.find();
  let fetchedRecipes;
  if (pageSize && currentPage) {
    recipeQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  recipeQuery.then(documents=> {
    fetchedRecipes = documents;
    return Recipe.countDocuments();
  }).then(count => {
    res.status(200).json({
      recipes: fetchedRecipes,
      maxRecipes: count
    });
  });
});

router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id).then(recipe => {
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({message: 'Recipe not found'});
    }
  })
});

router.delete('/:id', checkAuth, (req, res) => {
  const id = req.params.id;
  Comment.deleteMany({recipeId: id}).then(
    result => {
      console.log(result.n);
    }
  );
  Recipe.deleteOne({_id: req.params.id, user: req.userData.userId})
    .then(
    result => {
      if(result.n <= 0) {
        res.status(401).json({ message: "User not authorized" });
      }
      res.status(200).json({ message: "Deleted" });
    }
  );
});

router.post('/comment', checkAuth, (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
    recipeId: req.body.recipeId
  });
  Recipe.updateOne({_id: comment.recipeId}, {$push: { comments : comment}}).then(
    result => {
      if(result.n <= 0) {
        console.log('wrong');
      }
    }
  );
  comment.save().then(createdComment => {
    res.status(201).json({
      comment: {
        username: createdComment.username,
        comment: createdComment.comment,
        recipeId: createdComment.recipeId,
      }
    });
  });
});

module.exports = router;
