// models which are objects that represent collections in our database
const mongoose = require('mongoose');
// models are defined through the Schema interface
const Schema = mongoose.Schema;

const commentSchema = new      Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref:'User',
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId, ref:'Recipe',
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

// we access the database via mongoose.model.
const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;
