var nodemon = require('gulp-nodemon');
var gulp = require('gulp');

gulp.task('api-livereload', function () {
    return nodemon({
        script: 'run.js',
        watch: ['api/swagger/sources/'],
        ext: 'yaml js',
        //nodeArgs: ['--nolazy', '--debug-brk=3000'],
        // env: {
        //     'NODE_ENV': 'dev',
        //     'PORT': '3002'
        // }
    }).on('start', ['build']);
    // .on('change', ['build']);
    // .on('restart', function () {
    //   console.log('restarted!');
    // });
});