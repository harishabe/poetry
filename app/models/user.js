// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  fname:String,
  lname:String,
  email:String,
  phnum:String,
  username: String,
  password: String,
  title:String,
  data:String
});

User.plugin(passportLocalMongoose);

var users = module.exports = mongoose.model('users', User);

module.exports.getUserById = function (id, callback) {
    users.findById(id, callback);
}

module.exports.saveStory = function (story, callback) {
    users.create(story, callback);
}