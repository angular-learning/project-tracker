// dependencies
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serverBuilder = require('./app/server.builder');

// Plugging mongoose in Promises Library
mongoose.Promise = require('q').Promise;

var database = require('./config/database'); 			// load the database config

var port  	 = process.env.PORT || 3000; 				// set the port
var env  	 = process.env.NODE_ENV;

console.log("env - " + env);

mongoose.connect(database.url, function (err) {
    if (err) {
        console.error('Connection to db failed: ' + err + '; ' + (err.stack || ''));
        process.exit(1);
    }
    console.log('database connected successfully');
});

var app = express();

app.set('port', serverBuilder.normalizePort(port));

if (env === "dev") {
    app.use(morgan('dev'));
}
else {
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./app/core/todo/routes')());
app.use('/api', require('./app/core/task/routes')());

// load the single view file (angular will handle the page changes on the front-end)
app.route('/*')
    .get(function (req, res) {
        res.sendFile(path.join(__dirname, './public/app/index.html'));
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    console.error(err);

    res.status(err.status || 500).end();
});

serverBuilder.startServer(serverBuilder.normalizePort(port), app);