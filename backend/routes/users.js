const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });
      user.save().then(
        result => {
          res.status(201).json({
            result: result
          });
        }).catch(
        e => {
          res.status(500).json({
            error: e
          })
        })
    })
});

router.post("/login", (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(
    user => {
      if(!user) {
        return res.status(401).json({
          message: "No user with the email"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    }).then(
    result => {
      if(!result) {
        return res.status(401).json({
          message: "Email or password not correct"
        })
      }
      const token = jwt.sign({email: fetchedUser.email,
          userId: fetchedUser._id, username: fetchedUser.username, firstname: fetchedUser.firstname,
          lastname: fetchedUser.lastname},
        process.env.JWT_KEY, {expiresIn: 1800});
      res.status(200).json({
        token: token,
        expiresIn: 1800
      });
    }).catch(
    e => {
      return res.status(401).json({
        message: "Email or password not correct"
      })
    }
  );
});

module.exports = router;
