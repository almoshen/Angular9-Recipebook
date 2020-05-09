const userController = require('../controllers/users');

const usersCreate = (req, res) => {
    userController.usersCreate(req)
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

const usersReadOne = (req, res) => {
    console.log(`POST on /auth/login endpoint`);
    
        const result = userController.usersReadOne(req)
        .then(
            result => {
                console.log(`usersReadOne.result ${result}`);
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
            }
        )        
    }

  const usersReadAll = (req, res) => {
    userController.usersReadAll()
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

const userLogout = (req, res) => {
    userController.usersLogout(req,res)
    .then(
        result => {
            res
            .status(200)
            .json({message: 'ok'});
        }
    ).catch(
        error => {
            console.log(JSON.stringify(error));
            res
            .status(401)
            .json({message: error});
        }
    )
};


module.exports = {
  usersCreate,
  usersReadOne,
  usersReadAll,
  userLogout
  
};
