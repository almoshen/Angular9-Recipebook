const mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');
require('dotenv').config();

let ingredientController = {

  async ingredientCreate(req) {
      const item = req.body.item;
      const category = req.body.category;
      const calories = req.body.calories;
      // let author = req.body.author;
      let author
      if (req.session.user) {
        author = req.session.user.userid;
      } else {
        throw 'user is not logged in';
      }
      const result = await Ingredient.create({
        item: item,
        category: category,
        calories: calories,
        author: author
      });
      return result;
  },
  
  async ingredientReadOne(req) {
    const key = req.params.key;
    console.log(`ingredientReadOne.key ${key}`);
    
    if (key === undefined) {
        throw 'id is required';
    } else {
        const result = await Ingredient.findOne({_id: key});
        console.log(`ingredientReadOne.result ${result}`);
        
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

  async ingredientReadAll() {
      const result = await Ingredient.find(); 
      console.log(`ingredientReadAll: ${result}`);   
      return result;    
  },

}

module.exports = ingredientController;