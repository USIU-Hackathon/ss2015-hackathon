var config = require('../config/database');
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

// id is email
var Attendees = thinky.createModel('Attendee', {
    name: String,
  	id: String,
  	date_registered: {
  		_type: Date,
        default: r.now()
    },
  	idea: String,
  	phone_number: String,
  	code: String,
  	github_username: String,
  	confirmed_user: {
  		_type: Boolean,
  		default: false
  	}
});


Attendees.docAddListener('save', function(attendee) {
    console.log( 'A new attendee has been saved' );
});

Attendees.ensureIndex('email');

module.exports = Attendees;
