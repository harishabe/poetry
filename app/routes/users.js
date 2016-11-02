var express = require('express');
var router = express.Router();

var passport = require('passport');

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res) {
  var user={};
  user.username=req.body.username;
  user.fname=req.body.fname;
  user.lname=req.body.lname;
  user.email=req.body.email;
  user.phnum=req.body.phnum;
  
  User.register(new User({ username: req.body.username,fname:req.body.fname,lname:req.body.lname,email:req.body.email,phnum:req.body.phnum }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});


module.exports = router;
