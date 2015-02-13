var express = require('express');
var router = express.Router();


exports.index = function(req, res) {
	res.render('index', { title: 'Hackathon' });
};


exports.index = function(req, res) {
	res.render('schedule', { title: 'Schedule' });
};

exports.index = function(req, res) {
	res.render('apply', { title: 'Apply' });
};

//module.exports = router;
