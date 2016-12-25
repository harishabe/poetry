var mongoose = require('mongoose');
var User = require('./user');
console.log("6")
var ObjectId = mongoose.Schema.Types.ObjectId;
var storeSchema = mongoose.Schema({
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'users'
        //required: true
    },
    title: {
        type: String,
        //required: true
    },
    data: {
        type: String,
        //required: true
    },
    // by: {
    //     type: String,
    //     required: true
    // },
    // likes: {
    //     type: String,
    //     required: true
    // }
});
var story = module.exports=mongoose.model('story', storeSchema);
module.exports.addStory = function (storyData, callback) {
    story.create(storyData, callback);
};

module.exports.getStoryById = function (userId, callback) {
    story.findById(userId, callback);
}


