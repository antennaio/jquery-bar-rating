var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence');

var path = require('path');

var srcFile = 'jquery.barrating.js',
    specFile = path.join(__dirname, 'test', 'jquery.barrating-spec.js');

var lessFiles = [
      path.join(__dirname, 'examples', 'less', 'examples.less'),
      path.join(__dirname, 'examples', 'less', 'main.less'),
    ];

var cssPath = path.join(__dirname, 'examples', 'css'),
    distPath = 'dist';


gulp.task('jshint', function() {
  return gulp.src(srcFile)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('uglify', function() {
  return gulp.src(srcFile)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distPath));
});

gulp.task('test', function() {
    return gulp.src(specFile)
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('less', function() {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(gulp.dest(cssPath));
});

gulp.task('build', function() {
  runSequence('jshint', 'test', 'uglify');
});

gulp.task('watch', function() {
  gulp.watch(srcFile, ['jshint']);
  gulp.watch(lessFiles, ['less']);
});

gulp.task('default', ['build']);
