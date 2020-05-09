require('dotenv').config();

let authMiddleware = {

    /*
    Check middleware auth for API
    */
    checkIfAuthPrivate (req, res, next){
        
        if (req.session.user) {
            next();
        } else {
            console.log('User not authenticated');
            res
            .status(403)
            .json({message: "User not authorized"});
        }

    }

    

}

module.exports = authMiddleware;