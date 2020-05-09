const express = require('express');
var path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile('static.html',{root: path.join(__dirname, '../../public' )});
    let username;
    if (req.session.user) {
      username = req.session.user.username;
    }
    const welcome = username ? `Welcome back ${username}` : `Welcome`;
    
    res.render('home',{
      message: welcome
    })
    // res.render('home', {layout: 'default'});
    
});


module.exports = router;
