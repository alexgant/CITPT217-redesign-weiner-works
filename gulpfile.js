//variables for dependencies installed using gulp command
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

//js function that will create the /app/js folder and put each of the listed javascript files in it
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/lightbox2/dist/js/lightbox-plus-jquery.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('js', 'serve')); //adding js


const { watch, series, parallel, src, dest, gulp } = require('gulp');
const connect = require('gulp-connect'); // Runs a local webserver
const open = require('gulp-open'); // Opens a URL in a web browser

// Launch Chrome web browser
// https://www.npmjs.com/package/gulp-open
function openBrowser(done) {
    var options = {
    uri: 'http://localhost:8080'
    };
    return src('./')
    .pipe(open(options));
    done();
}

// Gulp plugin to run a webserver (with LiveReload)
// https://www.npmjs.com/package/gulp-connect
function server(done) {
    return connect.server({
    root: './',
    port: 8080,
    debug: true,
    });
    done();
}

// Default Gulp command
exports.default = series(openBrowser, server);
