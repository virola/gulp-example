var gulp = require('gulp');

gulp.task('default', function() {
    // place code for your default task here
});

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    js:     ['src/*.js'],
    less:   ['src/css/*.less'],
    lessDest: ['src/css/main.less'],
    img:    ['src/']
};

gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['asset'], cb);
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('asset/js'));
});

gulp.task('uglify', ['js'], function() {
    return gulp.src(['asset/js/*.js'])
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('asset/js'));
});

// Copy all static images
gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('asset/img'));
});

// less
gulp.task('less', function () {
    gulp.src(paths.lessDest)
        // .pipe(sourcemaps.init())
        .pipe(less({compress: true}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('asset/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.img, ['img']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('test', ['watch', 'js', 'less', 'img']);
gulp.task('build', ['clean', 'uglify', 'cssmin', 'img']);
