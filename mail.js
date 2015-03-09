var kueConfig = require('./config/workerQueue');
var kue = require('kue')
  , redis = require('redis')
  , r = require('rethinkdb')
  , jobs = kue.createQueue(kueConfig.kue);

// rethink query - produce result and add create task

var config = require('../config/database');
r.connect(config.rethinkdb, function(err, conn) {
	conn.use('hackathon');
	r.db('hackathon').table('Attendee').run(conn, function() {

	});
})



exports.sendInfoEmail = function(user) {

	var job = jobs.create('email', {
	    to: user.email,
	    from: "no-reply@usiuhackathon.me",
		subject: user.subject,
	    title: 'Welcome to the USIU Hackathon - Verification',
	    text: user.body,
	    template: 'info-email'
	}).priority('high');

	job.attempts(2).backoff( true );
	job.save();
}
