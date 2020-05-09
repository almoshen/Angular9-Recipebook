const mongoose = require('mongoose');


const ingredientScheme = mongoose.Schema({
  name: { type: String, required:true },
  amount: { type: Number, required:true }
});
// const commentSchema = mongoose.Schema({
//   username: { type: String, required: true},
//   comment: { type: String, required: true},
//   recipeId: { type: mongoose.Schema.Types.ObjectId, ref:'Recipe', required: true}
// });
const RecipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String, required: true},
  imagePath: { type: String, required: true},
  ingredients: [ ingredientScheme ],
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
  username: { type: String, required: true},
  comments: [],
  likes: { type: String, required: true}
}
// ,{
//   versionKey: false
// }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
