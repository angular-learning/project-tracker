// dependencies

// exports

module.exports = {
    normalizePort: _normalizePort
};

// initialization

// private methods

function _normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}