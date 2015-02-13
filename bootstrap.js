module.exports = function(app, express) {
    var exphbs  = require('express-handlebars');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var fs = require('fs');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var config = require("./config/database");

    // import routes to be used
    var index = require('./routes/index');
    var attendees = require('./routes/attendees');


    var port = process.env.PORT || 8000;


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    app.set('trust proxy', 'loopback');


    // setup the logger and only log errors
    var accessLogStream = fs.createWriteStream('InkOverFlow.log', 
    	{ flags: 'a' });
    app.use(logger('combined', { stream: accessLogStream,
        skip: function (req, res) { return res.statusCode < 400 } }));


    app.use(favicon(__dirname + '/assets/images/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser('session_secret'));
    app.use(express.static(path.join(__dirname, 'assets')));


    // middleware to use for all requests
    app.all("*", function(req, res, next) {
        console.log('request being processed');
        next();
    });

    // static pages routes
    app.get('/', index.index);
    app.get('/apply', index.apply);
    app.get('/schedule', index.schedule);

    // API
    app.post('/addAttendee', attendees.addAttendee);


    // 404 error handler
    app.get('*', function(req, res) {
      res.render('404', 404);
    });


    // 500 error handler --> production only
    // need to improve 500 logging
    app.use(function(error, req, res, next) {
        res.status(500);
        res.render('500', { title:'500: Internal Server Error', error: error });
    });


    // ensure request is application/json
    function ensureJSON(req, res, next) {
        if ( ! req.is('application/json') ) {
          res.status(400).json({ 'Error': 'Bad Request' });
        } return next();
    }

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } res.redirect('/login');
    }

    module.exports = app;

    app.listen(port);

    console.log('Magic happens on port ' + port);
}