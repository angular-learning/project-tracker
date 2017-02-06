// This file contains the server side JavaScript code for your application.

// setting up dependencies
// core 
var express             = require('express');
var bodyParser          = require('body-parser');
var http                = require('http');
var cookieParser        = require('cookie-parser');
var expressSession      = require('express-session');
var app                 = express();

// tools
var q                   = require('q');
var path                = require('path');
var cors                = require('cors')
var logger              = require('morgan');
var portTool            = require('../tools/port.tool.js');

// database
var mongoose            = require('mongoose');
// authentication 
var passport            = require('passport');

// api middleware
var SwaggerExpress      = require('swagger-express-mw');
var SwaggerUi           = require('swagger-tools/middleware/swagger-ui');
// ****************************************************************************

// configuration
// module interface
module.exports = {
    run: _runServer
};

// swagger
var swaggerConfig = {
    appRoot: './'
};

// passport
require('../../config/passport')(passport);

// database
var databaseConfig = require('../../config/database');

// ****************************************************************************
// setup express application
function _runServer(port, env) {
    _connectToDatabase(databaseConfig);
    _registerHttpLogs(env);

    // setup middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));

    // setup authentication via passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(path.join(__dirname, '../../public')));

    // fix of swagger issue when validation empty request params
    app.use((req, res, next) => {
        if (req.headers['content-length'] === '0' && req.headers['content-type'] == null) {
            req.headers['content-type'] = 'application/json' // or whatever your api consumes
        }
        next()
    })

    var normalizedPort = portTool.normalizePort(port);    
    app.set('port', normalizedPort);

    SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
        if (err) { throw err; }

        swaggerExpress.runner.swagger.host = 'localhost:' + process.env.PORT;
        app.use(SwaggerUi(swaggerExpress.runner.swagger));
        swaggerExpress.register(app);

        // load the single view file 
        // (angular will handle the page changes on the front-end)    
        app.route('/*').get(_sendMainHtmlFile);

        // catch 404 and forward to error handler
        app.use(_handle404Error);

        // general error handlers
        app.use(_internalErrorHandler);

        var server = http.createServer(app);

        server.listen(port, function () {
            console.log('Listening on ' + port);
        });
        server.on('error', _handleError.bind(null, port));
        server.on('listening', _handlePort.bind(server));

        return server;
    });
}

// ****************************************************************************
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

function _handlePort() {
    var server = this;
    var address = server.address();
    var boundPort = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    console.log('Listening on ' + boundPort);
}

function _handleError(port, error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var boundPort = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(boundPort + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(boundPort + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function _connectToDatabase(config){    
    mongoose.connect(config.url, function (err) {
        if (err) {
            console.error('Connection to db failed: ' + err + '; ' + (err.stack || ''));
            process.exit(1);
            return;
        }
        console.log('database connected successfully');
    });
    mongoose.Promise = q.Promise;
}

function _registerHttpLogs(env){
    var environmentType = env.NODE_ENV;
    console.log("environment type - " + environmentType);

    // register HTTP logs by env type
    if (environmentType === "dev") {
        app.use(logger('dev'));
    }
    else {
        app.use(logger('combined'));
    }
}