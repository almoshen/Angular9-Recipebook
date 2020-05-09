const recipeController = require('../controllers/recipes');

const recipeCreate = (req, res) => {
    recipeController.recipeCreate(req)
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

const recipeReadOne = (req, res) => {
    recipeController.recipeReadOne(req)
    .then(
        result => {
            console.log(`recipeReadOne.result ${result}`);
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

const recipeReadAll = (req, res) => {
    recipeController.recipeReadAll()
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

const recipeUpdate = async (req, res) => {
    const requestBody = req.body;
    const key = req.params.key;
	let updatedObject = {};
	try {
		const oldPost = await recipeController.recipeReadOne(req);
		if (requestBody.ingredients && requestBody.ingredients !== oldPost.ingredients) updatedObject.ingredients = requestBody.ingredients;
		if (requestBody.title && requestBody.title !== oldPost.title) updatedObject.title = requestBody.title;
		if (requestBody.instructions && requestBody.instructions !== oldPost.instructions) updatedObject.instructions = requestBody.instructions;
        if (requestBody.calories && requestBody.calories !== oldPost.calories) updatedObject.calories = requestBody.calories;
        if (requestBody.author && requestBody.author !== oldPost.author) updatedObject.author = requestBody.author;
	} catch (e) {
		res.status(404).json({ error: 'Recipe not found' });
		return;
	}

	
    
    recipeController.recipeUpdate(key, updatedObject)
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
    recipeCreate,
    recipeReadAll,
    recipeReadOne,
    recipeUpdate
  
};
