var path = require('path');

var gulp = require('gulp');
var server = require('gulp-server-livereload');

var paths = {
    app: path.join(__dirname, '../public')
};

var timeExpression = /.*(\d{2}:\d{2}:\d{2}).*/;

gulp.task('livereload', function () {
    var serverPort = process.env.SERVER_PORT;
    console.log("Port for proxy is " + serverPort);

    var apiEndpoint = { source: '/api', target: 'http://localhost:' + serverPort + '/api' };
    var config = {
        livereload: true,
        directoryListing: false,
        open: false,
        host: '127.0.0.1',
        port: 3003,
        fallback: 'app/pt.index.html',
        log: 'debug',
        proxies: [apiEndpoint]
    };

    console.log(`[${_toTime(new Date())}] "${paths.app}" is tracking now.`);
    return gulp.src(paths.app).pipe(server(config));
});

function _toTime(date) {
    return date.toTimeString().replace(timeExpression, "$1");
}