// set up ======================================================================
// get all the tools we need
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

// configuration ===============================================================
require('../../config/passport')(passport); // pass passport for configuration

function _create(env) {
    var environmentType = env.NODE_ENV;
    console.log("environment type - " + environmentType);

    // connect to database 
    var databaseConfiguration = require('../../config/database');
    mongoose.connect(databaseConfiguration.url, function (err) {
        if (err) {
            console.error('Connection to db failed: ' + err + '; ' + (err.stack || ''));
            process.exit(1);
            return;
        }
        console.log('database connected successfully');
    });

    // register HTTP logs by env type
    if (environmentType === "dev") {
        app.use(logger('dev'));
    }
    else {
        app.use(logger('combined'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, '../../public')));

    app.use('/api', require('./../modules/user/routes')());    
    app.use('/api', require('./../modules/task/routes')());
    app.use('/api', require('./../modules/history/routes')());

    // load the single view file 
    // (angular will handle the page changes on the front-end)    
    app.route('/*').get(_sendMainHtmlFile); 

    // catch 404 and forward to error handler
    app.use(_handle404Error); 
    
    // general error handlers
    app.use(_internalErrorHandler); 

    return app;
}

function _sendMainHtmlFile(req, res) {
    res.sendFile(path.join(__dirname, '../../public/app/pt.app.html'));
}

function _handle404Error(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function _internalErrorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).end();
}

module.exports = {
    create: _create
};