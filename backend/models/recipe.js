const mongoose = require('mongoose');

const recipeScheme = mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String, required: true},
  imagePath: { type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
}
// ,{
//   versionKey: false
// }
);

module.exports = mongoose.model('Recipe', recipeScheme);
