var slug = require('slug');
var Post = require('../models/posts');


exports.addPost = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_post = new Post({
		id: req.body.id,
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    content: req.body.content,
	    profileImage: req.body.profileImage,
	    type: req.body.post_type,
    	displayName: req.body.displayName,
    	username: req.body.username,
	    postmetadata: {
    		comments_id: req.body.comments_id,
  			time_to_read: req.body.time_to_read,
  			likes: req.body.likes
	    }
	});

	new_post.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Post Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Post Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Post Created'});
	    }
	});
};


exports.getPostById = function(req, res) {

	Post.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Post Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Post sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getPosts = function(req, res) {

	Post.orderBy("creation_date").run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Post sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.deletePostById = function(req, res) {

	Post.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Post Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Post deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Post Deleted' });
		}
	});
};


exports.updatePostById = function(req, res) {

	var _post = new Post({
		id: req.body.id,
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    content: req.body.content,
	    profileImage: req.body.profileImage,
	    type: req.body.post_type,
    	displayName: req.body.displayName,
    	username: req.body.username,
	    postmetadata: {
    		comments_id: req.body.comments_id,
  			time_to_read: req.body.time_to_read,
  			likes: req.body.likes
	    }
	});

	Post.get( req.params.id ).update(_post).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Post Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Post updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_post);
		}
	});
};
