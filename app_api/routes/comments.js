const commentController = require('../controllers/comments');

const commentCreate = (req, res) => {
    commentController.commentCreate(req)
    .then(
        result => {
            console.log(result);
            res
            .status(201)
            .json(result);
        }
    ).catch(
        error => {
            console.log(error);
            res
            .status(401)
            .json({message: error});
        }
    )
};

const commentReadOne = (req, res) => {
    commentController.commentReadOne(req)
    .then(
        result => {
            console.log(`commentReadOne.result ${result}`);
            if (result.status == 'error') {
                res
                .status(400)
                .json({
                    message: result.message
                }); 
            } else {
                res
                .status(200)
                .json({
                    message: result.message
                }); 
            }
        }
        
    )
    .catch(
        error => {
            res
                .status(500)
                .json({
                    message: error
                }); 
        })        
    }

  const commentReadAll = (req, res) => {
    commentController.commentReadAll()
    .then(
        result => {
            console.log(result);
            res
            .status(201)
            .json(result);
        }
    ).catch(
        error => {
            console.log(error);
            res
            .status(401)
            .json({message: error});
        }
    )
};


module.exports = {
    commentCreate,
    commentReadOne,
    commentReadAll
  
};
