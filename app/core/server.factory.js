// dependencies
var http = require('http');

// exports
module.exports = {
    startServer: _startServer
};

// private functions

function _startServer(port, app) {
    var server = http.createServer(app);

    server.listen(port);
    server.on('error', _handleError.bind(null, port));
    server.on('listening', _handlePort.bind(server));

    return server;
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