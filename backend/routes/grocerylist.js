const express = require("express");
const router = express.Router();
const List = require('../models/list');

const checkAuth = require('../auth/check-auth');

router.post('', checkAuth, (req,res) => {
  const list = new List({
    user: req.userData.userId,
    ingredients: req.body
  });
  list.save().then(createdList => {
      res.status(201).json({
        list: {
          user: createdList.user,
          ingredients: createdList.ingredients
        }
      });
    });
  });

router.get('', checkAuth, async (req,res) => {
  try {
    List.findOne({user: req.userData.userId}).select("-user -__v").then(list => {
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(200).json(null);
      }
    })
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.patch('', checkAuth, (req, res) => {
  // const list = new List({
  //   id: req.body.id,
  //   user: req.userData.userId,
  //   ingredients: req.body.ingredients
  // });
  console.log("Patch in edit: " + req.body);
  List.updateOne({user: req.userData.userId}, {$set: {ingredients: req.body}}).then(result => {
      if( result.nModified <= 0) {
        res.status(401).json({ message: "User not authorized" });
      }
      res.status(200).json({message: 'Update successful'})
    })
});

router.patch('/:id', (req,res) => {
  let ingredients = req.body;
  console.log("In patch: " + JSON.parse(JSON.stringify(ingredients)));
  // const updatedIngredients = {};
  // updatedIngredients.ingredients = ingredients;
  // console.log("updatedIngredients: " + updatedIngredients.ingredients);
  let item = [];
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      item.push(req.body[key]);
    }
  }
  List.updateOne({user: req.params.id}, { $addToSet: {ingredients: {$each: ingredients}}}).then(result => {
    if(result.nModified <= 0) {
      console.log("wrong");
    }
  })
});

router.delete('', checkAuth, (req, res) => {
  List.deleteOne({user: req.userData.userId})
    .then(
      result => {
        console.log(result.n)
        if(result.n <= 0) {
          res.status(401).json({ message: "User not authorized" });
        }
        res.status(200).json({ message: "Deleted" });
      }
    );
});

module.exports = router;
