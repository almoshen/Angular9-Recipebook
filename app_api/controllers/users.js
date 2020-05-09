require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

/**
 * Adds attribute to the session cookies
 *
 * @param {req} req the client request
 * @param {result} result The result with the data e.g. from a SQL 
 * @returns void
 */
let addSessionCookie = (req, result) => {
    req.session.user = {
        username: result.username,
        userid: result._id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email
    }
}


let userController = {

    async usersCreate(req) {
        const username = req.body.username;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const result = await User.create({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email
        });
        addSessionCookie(req, result);
        return result;
    },
    
    async usersReadOne(req) {
        const username = req.body.username;
        const password = req.body.password;
        console.log(`usersReadOne: ${username}`);
        
        if (username === undefined || password === undefined) {
            throw 'username and password are required';
        } else {
            const result = await User.findOne({username:username});
            if (result === null) {
                return {
                    status: "error",
                    message: "The username or the password is wrong!"
                }
            }
            const passwordValid = await bcrypt.compare(password, result.password);
            if (!passwordValid) {
                return {
                    status: "error",
                    message: "The username or the password is wrong!"
                }
            } else {
                addSessionCookie(req, result);
                return {
                    status: "ok",
                    message: "User OK!"
                }
            }
            
            // return {
            //     token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
            //     user,
            //    }
            
                
        }
        
    },

    async usersReadAll() {
        const result = await User.find(); 
        console.log(`usersReadAll: ${result}`);   
        return result;    
    },

    async usersLogout(req, res) {
        req.session.destroy();
        res.clearCookie(process.env.SESSION_COOKIE_NAME);
        return res;
    }


}

module.exports = userController;