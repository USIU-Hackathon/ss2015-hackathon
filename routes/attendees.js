var Attendees = require('../models/attendees');
var mail = require('../producer');


exports.addAttendee = function(req, res) {

	var randCode = JSON.stringify(Math.floor(Math.random() * 55343463543 * Math.random()));

	var newPost = new Attendees({
	  name: req.body.name,
	  id: req.body.email,
	  idea: req.body.idea,
	  phone_number: req.body.phone_number,
	  github_username: req.body.github_username,
	  code: randCode
	});

	// check if attendee is already registered
	newPost.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Attendee Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ "Error": "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Attendee Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

        	// email form
        	var htmlBody = "Hi, we have received your application for the USIU-A Hackathon " +
			"click on the link below to verify your registration. " +
			"If you did not register please ignore this email. " +
			"http://usiuhackathon.me/" + req.body.email + "/" + randCode;
			var user = {
				subject: "USIU-A Hackathon Confirmation",
				email: req.body.email,
				body: htmlBody
			};
        	mail.sendEmail(user);

			res.status(200).json({ 'OK': 'Attendee Saved'});
	    }
	});
};


exports.processCode = function(req, res) {

	Attendees.get( req.params.email ).run(function(error, result) {
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


/*
exports.getAttendeeById = function(req, res) {
};


exports.getPosts = function(req, res) {
};
*/