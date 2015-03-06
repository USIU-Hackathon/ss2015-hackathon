// We need this to build our post string
var querystring = require('querystring');
var https       = require('https');

// Your login credentials
var username = 'IanJuma';
var apikey   = '2a2a5ea28cdd80d566b20e8be38343d8ffebfbb7331b08a781d81d63d9f9d3ab';

function sendMessage(to_, message_) {
    // Build the post string from an object
    var post_data = querystring.stringify({
	    'username' : username,
	    'to'       : to_,
	    'message'  : message_
	});

    var post_options = {
		host: 'api.africastalking.com',
		port: '443',
		path: '/version1/messaging',
		method: 'POST',
		headers: {
		    'Content-Type' : 'application/x-www-form-urlencoded',
		    'Content-Length': post_data.length,
		    'Accept': 'application/json',
		    'apikey': apikey
		}
    };

    var post_req = https.request(post_options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
		    var jsObject   = JSON.parse(chunk);
		    var recipients = jsObject.SMSMessageData.Recipients;
		    if ( recipients.length > 0 ) {
				for (var i = 0; i < recipients.length; ++i ) {
				    var logStr  = 'number=' + recipients[i].number;
				    logStr     += ';cost='   + recipients[i].cost;
				    logStr     += ';messageId='   + recipients[i].messageId;
				    logStr     += ';status=' + recipients[i].status;
				    console.log(logStr);
				}
		    } else {
			console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
		    }
		});
	});

    post_req.write(post_data);
    post_req.end();
}

var message = "I'm a lumberjack and its ok, I sleep all night and I work all day";
var to      = '';
sendMessage(to, message);
