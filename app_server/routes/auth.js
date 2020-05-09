const express = require('express');
const router = express.Router();
const userController = require('../../app_api/controllers/users');
const authMiddleware = require('../../app_server/middleware/auth'); // check if a user is authenticated

router.get('/login', async (req, res) => {
    // res.sendFile('post.html',{root: path.join(__dirname, '../../public' )});
    res.render('login');

});


router.post('/login', async (req, res) => {
    console.log(`POST on /auth/login endpoint`);
    try {
        const result = await userController.usersReadOne(req);
        // console.log(result);
        if (result.status == 'error') {
            res
            .status(401)
            .render('login', {
                message: result.message
            }); 
        } else {
            res.redirect('/');
        }
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }

});


router.get('/register', async (req, res) => {
    res.render('register');

});


router.post('/register', async (req, res) => {

    userController.usersCreate(req)
    .then(
        result => {
            console.log(result);
            res.redirect('/');
        }
    ).catch(
        error => {
            console.log(error);
            res
            .status(401)
            .render('error', {
                message: error
            });
        }
    )

});


router.get('/logout', authMiddleware.checkIfAuthPrivate, async (req, res) => {
    //res.sendFile('static.html',{root: path.join(__dirname, '../../public' )});
    
    userController.usersLogout(req,res)
    .then(
        result => {
            res.redirect('/');
        }
    )
    .catch( 
        error => {
            console.log(error);
            res
            .status(401)
            .redirect('/');
        })
    
    

});


module.exports = router;
