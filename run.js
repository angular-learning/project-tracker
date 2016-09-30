// dependencies

var appFactory = require('./app/core/app.factory.js');
var runner = require('./app/www');

// initialization

var env = process.env;

var port = env.PORT || 3000;

runner.start(port, appFactory.create(env));

// private methods
