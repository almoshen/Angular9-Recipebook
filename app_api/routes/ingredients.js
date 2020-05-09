const ingredientController = require('../controllers/ingredients');

const ingredientCreate = (req, res) => {
    ingredientController.ingredientCreate(req)
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

const ingredientReadOne = (req, res) => {
    ingredientController.ingredientReadOne(req)
    .then(
        result => {
            console.log(`ingredientReadOne.result ${result}`);
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

  const ingredientReadAll = (req, res) => {
    ingredientController.ingredientReadAll()
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
    ingredientCreate,
    ingredientReadAll,
    ingredientReadOne
};
