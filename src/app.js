'use strict';

var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path');

require('es6-promise').polyfill();
require('marko/node-require').install();


var routeService = require('services/routeService');
    
var app = express();

app.disable('x-powered-by');

app.enable('strict routing');

var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
});

// Middlewares
if (app.get('env') == 'development' || app.get('env') == 'localhost') {
    app.use(express.static('.tmp')); // jshint ignore:line
    app.use(express.static('src/public')); // jshint ignore:line
} else {
    var staticPath = path.join(__dirname, '..', 'dist');
    app.set('staticPath', staticPath);
    app.use(express.static(staticPath, {
        maxAge: 60 * 60 * 24 * 365 * 1000,
        setHeaders: function (res, path, stt) {
            res.set('expires', Date.now() + 1000 * 60 * 60 * 24 * 365);
        }
    }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.locals.environment = app.get('env'); //environment setting

// Routing
routeService.setup(app, router); // handles all routing related logic


module.exports = app;
