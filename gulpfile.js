var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: 8082,
        livereload: true
    });
});

gulp.task('sass', function() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('icons', function() {
    return gulp.src('./bower_components/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./app/fonts'));
});

gulp.task('LiveReload', function() {
    gulp.src('./app/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    gulp.watch(['./app/**/*'], ['LiveReload']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'icons']);