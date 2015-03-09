var kueConfig = require('./config/workerQueue');
var kue = require('kue')
  , redis = require('redis')
  , r = require('rethinkdb')
  , jobs = kue.createQueue(kueConfig.kue);

// rethink query - produce result and add create task

/*
var connection = null;
var config = require('./config/database');
r.connect({
        host: "localhost",
        port: 29019,
        authKey: "hackathon2015",
        db: "hackathon"
    }, function(err, conn) {
	if (err) { throw err; }
	connection = conn;
});
*/

r.connect({
        host: "localhost",
        port: 29019,
        authKey: "hackathon2015",
        db: "hackathon"
    }, function(err, conn) {
	    r.table('Attendee').filter({'confirmed_user': false}).run(conn, function(result) {
			console.log(result);
		});
});


/*
r.db('hackathon').table('Attendee').run(connection, function(result) {
	console.log('result');
});
*/

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
