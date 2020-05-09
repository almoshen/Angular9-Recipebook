const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
require('dotenv').config();

let recipeController = {

  async recipeCreate(req) {
      const title = req.body.title;
      const ingredients = req.body.ingredients;
      const instructions = req.body.instructions;
      // const likes = req.body.likes;
      const calories = req.body.calories;
      const imagePath = req.body.imagePath;
      let author
      if (req.session.user) {
        author = req.session.user.userid;
      } else {
        throw 'user is not logged in';
      }
      
      const result = await Recipe.create({
          title: title,
          ingredients: ingredients,
          instructions: instructions,
          calories: calories,
          imagePath: imagePath,
          author: author
      });
      return result;
  },
  
  async recipeReadOne(req) {
      const key = req.params.key;
      console.log(`recipeReadOne.key ${key}`);
      
      if (key === undefined) {
          throw 'id is required';
      } else {
          const result = await Recipe.findOne({_id: key});
          console.log(`recipeReadOne.result ${result}`);
          
            if (result === null) {
                return {
                    status: "error",
                    message: "The id is wrong!"
                }
            }
            return {
                status: "error",
                message: result
            }
      }
      
  },

  async recipeUpdate(id, updatedRecipe) {
    console.log({id});
    console.log({updatedRecipe});
    
    const updatedRecipeData = {};

    if (updatedRecipe.ingredients) {
        updatedRecipeData.ingredients = updatedRecipe.ingredients;
    }

    if (updatedRecipe.title) {
        updatedRecipeData.title = updatedRecipe.title;
    }

    if (updatedRecipe.instructions) {
        updatedRecipeData.instructions = updatedRecipe.instructions;
    }
    if (updatedRecipe.calories) {
        updatedRecipeData.calories = updatedRecipe.calories;
    }
    if (updatedRecipe.imagePath) {
        updatedRecipeData.imagePath = updatedRecipe.imagePath;
    }
    if (updatedRecipe.author) {
        updatedRecipeData.author = updatedRecipe.author;
    }

    if (id === undefined) {
        throw 'id is required';
    } else {
          
          const result = await Recipe.updateOne({_id: id}, {$set: updatedRecipeData});
          console.log(`recipeReadOne.result ${result}`);
          
          
          
            if (result === null) {
                return {
                    status: "error",
                    message: "The id is wrong!"
                }
            }
            return {
                status: "error",
                message: result
            }
      }
      
  },

  async recipeReadAll() {
      const result = await Recipe.find(); 
      console.log(`recipeReadAll: ${result}`);   
      return result;    
  },

}

module.exports = recipeController;