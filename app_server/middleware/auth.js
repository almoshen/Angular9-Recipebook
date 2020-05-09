require('dotenv').config();

let authMiddleware = {

    checkIfAuth (req, res, next){
        
        console.log(`Session id ${req.session.id}`);
        if (req.session.user) {
            console.log(`Session with userid: ${req.session.user.userid}`);
        } else {
            console.log(`Session with anonymous`);
        }
        next();
        
    },
    
    checkIfAuthPrivate (req, res, next){
        if (req.session.user) {
            next();
        } else {
            console.log('User not authenticated');
            res
            .status(403)
            .render('error', { message: "user not authenticated" });
        }
    }

    

}

module.exports = authMiddleware;