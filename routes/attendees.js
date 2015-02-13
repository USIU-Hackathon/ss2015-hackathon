var Attendees = require('../models/attendees');


exports.addAttendee = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var newPost = new Attendees({
	  name: req.body.name,
	  email: req.body.email,
	  idea: req.body.idea,
	  phone_number: req.body.phone_number,
	  github_username: req.body.github_username
	});

	newPost.save().then(function(error) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Attendee saved');
	        res.set({
			  'Content-Type': 'application/json',
			});
			res.status(200).json({ 'OK': 'Attendee Created'});
	    }
	});
};


exports.getAttendeeById = function(req, res) {
	
};


exports.getPosts = function(req, res) {
	
};
