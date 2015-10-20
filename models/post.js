var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
		postBody: {type: String, required: true},
});

var Post = mongoose.model('Post', postSchema);


module.exports = Post;