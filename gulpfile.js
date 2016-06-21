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

// gulp.task('foundation-sass', function() {
//     return gulp.src('./scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./css'));
// });

gulp.task('LiveReload', function() {
    gulp.src('./app/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    // gulp.watch('./scss/*.scss', ['foundation-sass']);
    gulp.watch(['./app/**/*'], ['LiveReload']);
});

gulp.task('default', ['connect', 'watch', 'sass', /*'foundation-sass'*/]);