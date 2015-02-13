var Attendees = require('../models/attendees');


exports.addAttendee = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var newPost = new Attendees({
	  name: req.body.name,
	  id: req.body.email,
	  idea: req.body.idea,
	  phone_number: req.body.phone_number,
	  github_username: req.body.github_username,
	  code: JSON.stringify(Math.floor(Math.random() * 55343463543 * Math.random()))
	});

	// check if attendee is already registered
	newPost.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Attendee Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Attendee Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Attendee Saved'});
	    }
	});
};


exports.processCode = function(req, res) {

	Attendees.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
			if (result.code != req.params.code) {
				res.status(400).json({"Error": "Code MisMatch"});
			}
		}
	});
};


exports.getAttendeeById = function(req, res) {
};


exports.getPosts = function(req, res) {
};
