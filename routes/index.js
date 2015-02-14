var express = require('express');
var router = express.Router();


exports.index = function(req, res) {
	res.render('index', { title: 'Hackathon' });
};


exports.schedule = function(req, res) {
	res.render('schedule', { title: 'Schedule' });
};


exports.apply = function(req, res) {
	res.render('register', { title: 'Register' });
};


exports.contact = function(req, res) {
	res.render('contact', { title: 'Contact' });
}

//module.exports = router;
