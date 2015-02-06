var slug = require('slug');
var Attendees = require('../models/attendees');


exports.addAttendee = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_post = new Attendees({
	  name: req.body.name,
	  email: req.body.email,
	  idea: req.body.idea,
	  phone_number: req.body.phone_number,
	  github_username: req.body.github_username
	});

	Attendees.save().then(function(error) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Attendee saved');
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
	
};
