var kueConfig = require('./config/workerQueue');
var sendgrid  = require('sendgrid')('wjuma', 'obamanation2008');


// queue
var kue = require('kue')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue);


jobs.process('email', function(job, done) {
	console.log(job.data);

	var email = new sendgrid.Email(job.data);

	sendgrid.send(email, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});

});
