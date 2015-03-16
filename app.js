var express = require('express');
var app = express();
require('dotenv').load();
var bootstrap = require('./bootstrap');


bootstrap(app, express);
