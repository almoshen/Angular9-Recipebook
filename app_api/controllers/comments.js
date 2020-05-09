const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
require('dotenv').config();

let commentController = {

  async commentCreate(req) {
      const comment = req.body.comment;
      const recipe = req.body.recipe;
      let author
      if (req.session.user) {
        author = req.session.user.userid;
      } else {
        throw 'user is not logged in';
      }
      const result = await Comment.create({
        comment: comment,
        recipe: recipe,
        author: author
      });
      return result;
  },
  
  async commentReadOne(req) {
    const key = req.params.key;
    console.log(`commentReadOne.key ${key}`);
    
    if (key === undefined) {
        throw 'id is required';
    } else {
        const result = await Comment.findOne({_id: key});
        console.log(`commentReadOne.result ${result}`);
        
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

  async commentReadAll() {
      const result = await Comment.find(); 
      console.log(`commentReadAll: ${result}`);   
      return result;    
  },
}

module.exports = commentController;