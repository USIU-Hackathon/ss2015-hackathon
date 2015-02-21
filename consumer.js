var kueConfig = require('./config/workerQueue');
var sendgrid  = require('sendgrid')('wjuma', 'obamanation2008');

var kue = require('kue')
	  , redis = require('redis')
	  , jobs = kue.createQueue(kueConfig.kue);

// queue
exports.startQueue = function() {

	jobs.process('email', function(job, done) {

		var email = new sendgrid.Email();

		email.addTo(job.data.to);
		email.setFrom(job.data.from);
		email.setSubject(job.data.subject);
		email.setHtml(job.data.text);

		sendgrid.send(email, function(err, json) {
		  if (err) { return console.error(err); }
		  console.log(json);
		});

		done();
	});
}
