// setting up dependencies
//var runner = require('./app/www');
var runner = require('./app/core/server.js');

// initialization
var env = process.env;
var port = env.PORT || 3000;

// starting server
runner.run(port, env);
