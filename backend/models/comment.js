const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true},
    recipeId: { type: String, required: true},
  }
// ,{
//   versionKey: false
// }
);

module.exports = mongoose.model('Comment', CommentSchema);
