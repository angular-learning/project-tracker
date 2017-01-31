// dependencies
var http = require('http');
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

// exports
module.exports = {
    startServer: _startServer
};

var config = {
    appRoot: './' // required config
};

// private functions
function _startServer(port, app) {
    SwaggerExpress.create(config, function (err, swaggerExpress) {
        if (err) { throw err; }

        app.use(SwaggerUi(swaggerExpress.runner.swagger));

        // install middleware
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