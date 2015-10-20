console.log("Sanity Check: JS is working!");

$(document).ready(function(){

var numPosts = 0;

	$('#create-post-form').submit(function(e) {
  	e.preventDefault();
  	numPosts++;
  	var formData = $(this).serialize();
  	$('#create-post').focus();
  	console.log(formData);
  	$.ajax({
  		url: '/posts',
  		type: "POST",
  		data: formData
  	})
  	.done(function(data) {
  		console.log("made a new post", data);
  		var postHtml = '<p class="list-group-item">' + data.postBody + ' <span class="pull-right" id="'+ data._id + '">Post #'+ numPosts+'<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p>';
  		$("#post-list").prepend(postHtml);
  		$('#create-post-form')[0].reset();
  	})
  	.fail(function(data) {
  		$('#fail').modal();
  		alert("Failed to post");
  	});
  });

});