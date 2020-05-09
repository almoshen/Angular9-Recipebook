// const express = require('express');
// var path = require('path');
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const User = mongoose.model('User');
const Ingredient = mongoose.model('Ingredient');
require('dotenv').config();

    // recipeReadAll: {
    //   ingredients: [ 5eade8e9120f4853949e34c0 ],
    //   _id: 5eade9859197a259cce1f896,
    //   title: 'carbonara',
    //   instructions: 'boil the pasta for 10 min',
    //   calories: 10,
    //   imagePath: '/link/to',
    //   author: 5eab6e50e8683d45a88025ab,
    //   createdOn: 2020-05-02T21:43:33.455Z,
    //   __v: 0
    // }

const recipeReadAll = (req, res) => {
    var query = Recipe.find({}).lean();
    query.exec(function (err, result) {
        if (err) {
            throw Error;
        }
        res.render('recipes', {recipes: result});
    });  
}

const recipeNew = (req, res) => {
    res.render('recipe-detail-new');  
}

/*
{
  recipe: {
    _id: 5eade9859197a259cce1f896,
    ingredients: [ 5eade8e9120f4853949e34c0 ],
    title: 'carbonara',
    instructions: 'boil the pasta for 10 min',
    calories: 10,
    imagePath: '/link/to',
    author: 5eab6e50e8683d45a88025ab,
    createdOn: 2020-05-02T21:43:33.455Z,
    __v: 0
  }
}
{
  user: {
    _id: 5eab6e50e8683d45a88025ab,
    recipes: [],
    username: 'mauri',
    password: '$2b$10$vlEKHZuZZNTdoaabfDyfKux9VtYCGlq/rdkORdbKp3W1PJszaE4dC',
    firstname: 'Maurizio',
    lastname: 'Bella',
    email: 'mbella@stevens.edu',
    createdOn: 2020-05-01T00:33:20.348Z,
    __v: 0
  }
}
{
  ingredient: {
    _id: 5eade8e9120f4853949e34c0,
    item: 'spaghetti',
    category: 'pasta',
    calories: 100,
    author: 5eab6e50e8683d45a88025ab,
    createdOn: 2020-05-02T21:40:57.466Z,
    __v: 0
  }
}
*/

const recipeEditDetail = async (req, res) => {
    const key = req.params.key;
    if (key === undefined) {
        throw 'id is required';
    } else {
    const recipe = await Recipe.findOne({_id: req.params.key}).lean();
    const user = await User.findOne({_id: recipe.author}).lean();
    const ingredient = await Ingredient.find({_id: recipe.ingredients}).lean();
    console.log({recipe});
    console.log({user});
    console.log({ingredient});

    const recipedetail = {
        key: key,
        title : recipe.title,
        instructions: recipe.instructions,
        calories: recipe.calories,
        imagePath: recipe.imagePath,
        createdOn: recipe.createdOn,
        ingredients: ingredient,
        author: user.username


    };

    res.render('recipe-detail-edit', {recipes: recipedetail});
    // query.exec(function (err, result) {
    //     if (err) {
    //         throw Error;
    //     }
    //     res.render('recipe-detail', {recipes: result});
    // });
  }
}

const recipeListDetail = async (req, res) => {
    const key = req.params.key;
    if (key === undefined) {
        throw 'id is required';
    } else {
    const recipe = await Recipe.findOne({_id: req.params.key}).lean();
    const user = await User.findOne({_id: recipe.author}).lean();
    const ingredient = await Ingredient.find({_id: recipe.ingredients}).lean();
    console.log({recipe});
    console.log({user});
    console.log({ingredient});

    const recipedetail = {
        key: key,
        title : recipe.title,
        instructions: recipe.instructions,
        calories: recipe.calories,
        imagePath: recipe.imagePath,
        createdOn: recipe.createdOn,
        ingredients: ingredient,
        author: user.username


    };

    res.render('recipe-detail', {recipes: recipedetail});
    // query.exec(function (err, result) {
    //     if (err) {
    //         throw Error;
    //     }
    //     res.render('recipe-detail', {recipes: result});
    // });
  }
}


module.exports = {
    recipeReadAll,
    recipeNew,
    recipeEditDetail,
    recipeListDetail
  
};
