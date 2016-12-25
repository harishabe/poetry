var express = require('express');
var router = express.Router();

var passport = require('passport');

var User = require('../models/user');
var Story = require('../models/story');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res) {
  var user = {};
  user.username = req.body.username;
  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.email = req.body.email;
  user.phnum = req.body.phnum;

  User.register(new User({ username: req.body.username, fname: req.body.fname, lname: req.body.lname, email: req.body.email, phnum: req.body.phnum }),
    req.body.password, function (err, account) {
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

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        data: user,
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});



router.get('/api/:_id', function (req, res) {
  User.getUserById(req.params._id, function (err, User) {
    if (err) {
      throw err;
    }
    res.json(User);
  });

});

router.post('/api/story', function (req, res) {
  var storyData = {};
  storyData.userId = req.body.userId;
  storyData.title = req.body.title;
  storyData.data = req.body.data;
  storyData.by = req.body.by;
  storyData.likes = req.body.likes;
  Story.addStory(storyData, function (err, storyData) {
    if (err) {
      throw err;
    } else {
      res.json(storyData);
    }
  });
});

router.get('/api/getStory/:userId', function (req, res) {
  Story.getStoryById(req.params.userId, function (err, Story) {
    if (err) {
      throw err;
    }
    res.json(Story);
  });
});




module.exports = router;
