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


// router.post('/login',function(req,res){
// var username=req.body.username;
// var password=req.body.password;
// console.log(username,password);
// User.findOne({username:username,password:password},function(err,user){
// console.log(err,user);
// if(err){
//   console.log(err);
//   return res.status(500).send();
// }
// if(!user){
//   console.log('invalid credentials');
//   return res.status(404).send();
// }
// return res.status(200).send();
// })
// })



router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(user); 
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
        data:user,
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});



router.get('/api/:_id',function (req,res) {
    User.getUserById(req.params._id,function (err,User) {
        if(err)
        {
            throw err;
        }
        res.json(User);
    });

});

router.post('/story',function(req,res,next){
      var story={};
      story.title=req.body.title;
      story.data=req.body.data;
      User.saveStory(story,function(err,story){
        console.log(story);
        if(err){
          throw err;
        }else{
          res.json(story);
        }
      })
})


module.exports = router;
