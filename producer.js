var kueConfig = require('./config/workerQueue');
var kue = require('kue')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue);


exports.sendEmail = function(user) {

	var job = jobs.create('email', {
	    to: user.email,
	    from: "no-reply@usiuhackathon.me",
		subject: user.subject,
	    title: 'Welcome to the USIU Hackathon - Verification',
	    text: user.body,
	    template: 'Verification-email'
	}).priority('high');

	job.attempts(2).backoff( true );
	job.save();
}
