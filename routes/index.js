var express = require('express');
var router = express.Router();


exports.index = function(req, res) {
	res.render('index', { title: 'Hackathon',
		description: 'USIU-A PRESENTS A HACKATHON ON MARCH 14' });
};


exports.schedule = function(req, res) {
	res.render('schedule', { title: 'Schedule',
		description: 'Schedule for the USIU-A Hackathon' });
};


exports.privacy = function(req, res) {
	res.render('privacy', { title: 'Privacy',
		description: 'Privacy terms for the USIU-A Hackathon' });
};

exports.rules = function(req, res) {
	res.render('rules', { title: 'Rules',
		description: 'Rules for the USIU-A Hackathon' });
};


exports.terms = function(req, res) {
	res.render('terms', { title: 'Terms and Conditions',
		description: 'Terms and Conditions for the USIU-A Hackathon' });
};


exports.apply = function(req, res) {
	res.render('register', { title: 'Register',
		description: 'Register for the USIU-A Hackathon' });
};


exports.contact = function(req, res) {
	res.render('contact', { title: 'Contact',
		description: 'Contact page for the USIU-A Hackathon' });
}

/*
exports.guide = function(req, res) {

	var https = require('https');
	var Showdown = require('showdown');
	var converter = new Showdown.converter();

	var options = {
	  host: 'raw.githubusercontent.com',
	  port: 443,
	  path: '/USIU-Hackathon/guide/master/hackathon.md',
	  method: 'GET'
	};

	https.get(options, function(response) {

		var guide = '';
		response.on('data', function(chunk) {
			guide = chunk.toString(); 
			guide = converter.makeHtml(guide);
			res.render('guide', {title: 'Guide', guide: guide });
		});

	}).on('error', function(e) {
	  	console.log("Got error: " + e.message);
	});
	
}
*/


exports.guide = function(req, res) {

	var Showdown = require('showdown');
	var converter = new Showdown.converter();
	var fs = require("fs");

	fs.readFile("hackathon.md", function (err, data) {
		if (err) {
		    throw err;
		}

    	//console.log(data.toString());
    	guide = data.toString();
		guide = converter.makeHtml(guide);
		res.render('guide', {title: 'Guide', guide: guide,
			description: 'Guide to the USIU-A Hackathon' });
	});
}

//module.exports = router;
