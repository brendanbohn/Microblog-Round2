// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");



// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true })); 

var db = require('./models/index.js');

var numPosts = 0;


//ROUTES

// GET route
app.get('/posts', function(req, res) {
	db.Post.find({}, function(err, posts) {
		if(err) console.log(err);
		res.render('index', {posts: posts});
	});
});

// POST route
app.post('/posts', function(req, res) {
	console.log(req.body);
	db.Post.create(req.body, function(err, post) {
		console.log("post request went through");
		if (err) console.log(err);
		res.json(post);
	});
});

// DELETE route
app.delete('/posts/:id', function(req, res) {
	console.log('delete this post: ', req.params.id);
	db.Post.findOne({
		_id: req.params.id
	}).remove(function(err, post) {
		if (err) console.log(err);
		// console.log("post deleted: ", post._id, post.postBody);
		res.json("The post is gone");
	});
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});
