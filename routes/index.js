var express = require('express');
var router = express.Router();


exports.index = function(req, res) {
	res.render('app', { title: 'Hackathon' });
	console.log(req.user);
};

//module.exports = router;
