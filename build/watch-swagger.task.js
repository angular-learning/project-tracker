var gulp = require('gulp'),
    watch = require('gulp-watch');
    batch = require('gulp-batch');

gulp.task('watchSwagger', function () {
    return watch('api/swagger/sources/**/*.yaml', batch(function (events, done) {
        return gulp.start('build', done);
    }));
});