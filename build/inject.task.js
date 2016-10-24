// dependencies

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var _ = require('lodash');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var angularSort = require('gulp-angular-filesort');
var sort = require('sort-stream');

// exports

module.exports = {};

// initialization

var config = {
    htmlTemplate: './build/public/pt.app.html',
    files: {
        js: './public/app/**/*.js',
        css: './public/app/**/*.css'
    },
    paths: {
        destination: './public/app',
        bowerrc: '.bowerrc'
    }
};

var vendorsKey = '/vendors';

// private methods

gulp.task('inject', function() {
    var bowerrcContent = _parseJsonFile(config.paths.bowerrc);

    var overridesConfig = {
        "bootstrap": {
            main: [
                "dist/css/bootstrap.css",
                "dist/js/bootstrap.js"
            ]
        }
    };

    var vendorsStream = gulp.src(bowerFiles({ "overrides": overridesConfig }), { base: '../' + bowerrcContent.directory, read: false });

    var jsStream = gulp.src(config.files.js).pipe(angularSort());
    var cssStream = gulp.src(config.files.css).pipe(sort(_vendorsFirstComparator));

    var appStream = es.merge(jsStream, cssStream);

    var injectConfig = { ignorePath: 'public', name: 'inject' };

    return gulp.src(config.htmlTemplate)
        .pipe(inject(es.merge(vendorsStream, appStream), injectConfig))
        .pipe(gulp.dest(config.paths.destination));
});

function _parseJsonFile(pathToFile) {
    return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
}

function _vendorsFirstComparator(a, b) {
    var aIsVendors = _.startsWith(a, vendorsKey);
    var bIsVendors = _.startsWith(b, vendorsKey);
    if (aIsVendors || bIsVendors) {
        // don't worry about order for a while
        return 1;
    }
    if (aIsVendors && !bIsVendors) {
        return 1;
    }
    if (!aIsVendors && bIsVendors) {
        return -1;
    }
    if (!aIsVendors && !bIsVendors) {
        // don't worry about order for a while
        return 0;
    }
}