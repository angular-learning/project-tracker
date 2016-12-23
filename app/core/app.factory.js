// dependencies
var path = require('path');

var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// exports

module.exports = {
    create: _create
};

// private functions

function _create(env) {
    var databaseConfiguration = require('../../config/database');

    var environmentType = env.NODE_ENV;

    console.log("environment type - " + environmentType);

    mongoose.connect(databaseConfiguration.url, function (err) {
        if (err) {
            console.error('Connection to db failed: ' + err + '; ' + (err.stack || ''));
            process.exit(1);
            return;
        }
        console.log('database connected successfully');
    });

    var app = express();

    // register HTTP logs by env type
    if (environmentType === "dev") {
        app.use(morgan('dev'));
    }
    else {
        app.use(morgan('combined'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../public')));

    app.use('/api', require('./../modules/task/routes')());
    app.use('/api', require('./../modules/history/routes')());

    app.route('/*').get(_sendMainHtmlFile); // load the single view file (angular will handle the page changes on the front-end)
    app.use(_handle404Error); // catch 404 and forward to error handler
    app.use(_internalErrorHandler); // general error handlers

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