const express = require("express");
const router = express.Router();
const Recipe = require('../models/recipe');
const multer = require('multer');

const checkAuth = require('../auth/check-auth');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimeType];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth,
  multer({storage: storage}).single("image"), (req,res) => {
  const url = req.protocol + '://' + req.get("host");
  const recipe = new Recipe({
    title: req.body.title,
    instructions: req.body.instructions,
    imagePath: url + "/images/" + req.file.filename
  });
  recipe.save().then(createdRecipe => {
    res.status(201).json({
      recipe: {
        id: createdRecipe._id,
        title: createdRecipe.title,
        instructions: createdRecipe.instructionFn,
        imagePath: createdRecipe.imagePath
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
  const recipe = new Recipe({
    _id: req.body.id,
    title: req.body.title,
    instructions: req.body.instructions,
    imagePath: imagePath
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(result => {
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
  Recipe.deleteOne({_id: req.params.id}).then(
    result => {
      res.status(200).json({ message: "Deleted"});
    }
  );
});

module.exports = router;
