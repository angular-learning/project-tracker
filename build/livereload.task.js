var path = require('path');

var gulp = require('gulp');
var server = require('gulp-server-livereload');

var paths = {
    app: path.join(__dirname, '../public')
};

var timeExpression = /.*(\d{2}:\d{2}:\d{2}).*/;

gulp.task('livereload', function () {
    var serverPort = process.env.SERVER_PORT;
    console.log(`[${_toTime(new Date())}] Port for proxy is ${serverPort}`);

    var ip = '127.0.0.1';
    var apiEndpoint = { source: '/api', target: `http://${ip}:${serverPort}/api` };
    var config = {
        livereload: true,
        directoryListing: false,
        open: false,
        host: ip,
        port: 3003,
        fallback: 'app/pt.app.html',
        log: 'debug',
        proxies: [apiEndpoint]
    };

    console.log(`[${_toTime(new Date())}] "${paths.app}" is tracking now.`);
    return gulp.src(paths.app).pipe(server(config));
});

function _toTime(date) {
    return date.toTimeString().replace(timeExpression, "$1");
}