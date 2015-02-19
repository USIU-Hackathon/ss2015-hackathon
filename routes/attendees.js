var Attendees = require('../models/attendees');
var mail = require('../producer');
var queue = require('../consumer');
var Handlebars = require('handlebars');


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

			var name = req.body.name.split(' ')[0];

			var url = "http://usiuhackathon.me/verify/" + req.body.email + "/" + randCode;
			var htmlBody = Handlebars.templates.email(context, {name: req.body.name, verificationUrl: url });

			var user = {
				subject: "USIU-A Hackathon Confirmation",
				email: req.body.email,
				body: htmlBody
			};
        	mail.sendEmail(user);
        	queue.startQueue();

        	res.set({
			  'Content-Type': 'application/json',
			});

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
			} else {

				Attendees.get( req.params.email ).update({ "confirmed_user": true }).run(function(error, result) {
					if (error) {
						res.status(500).json({ "error": "something blew up, we're fixing it" });
					} else {
				        console.log('Attendee updated');

						res.header('Verifying', 'True');
						res.redirect('/thankyou');
					}
				});
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