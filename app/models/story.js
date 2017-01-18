var mongoose = require('mongoose');
var User = require('./user');
var ObjectId = mongoose.Schema.Types.ObjectId;
var storeSchema = mongoose.Schema({
    userId: {
       type: String,
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


module.exports.getStoryById = function (callback,limit) {
    story.find(callback).limit(limit);
};

module.exports.removeStory=function (id,callback) {
    var query={_id:id};
    story.remove(query,callback);
}
