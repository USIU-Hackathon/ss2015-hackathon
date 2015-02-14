var express = require('express');
var router = express.Router();


exports.index = function(req, res) {
	res.render('index', { title: 'Hackathon' });
};


exports.schedule = function(req, res) {
	res.render('schedule', { title: 'Schedule' });
};


exports.privacy = function(req, res) {
	res.render('privacy', { title: 'Privacy' });
};

exports.rules = function(req, res) {
	res.render('rules', { title: 'Rules' });
};


exports.terms = function(req, res) {
	res.render('terms', { title: 'Terms and Conditions' });
};


exports.apply = function(req, res) {
	res.render('register', { title: 'Register' });
};


exports.contact = function(req, res) {
	res.render('contact', { title: 'Contact' });
}

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

//module.exports = router;
