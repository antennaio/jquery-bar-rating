var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    KarmaServer = require('karma').Server,
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence');

var path = require('path');

var srcFile = 'jquery.barrating.js';

var lessFiles = [
      path.join(__dirname, 'docs', 'less', 'examples.less'),
      path.join(__dirname, 'docs', 'less', 'main.less'),
    ];

var cssPath = path.join(__dirname, 'docs', 'css'),
    distPath = 'dist';

var themePath = path.join(__dirname, 'dist', 'themes');

var themeLessFiles = 'themes/*.less';

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

gulp.task('test', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('less', function() {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(gulp.dest(cssPath));
});

gulp.task('themes', function() {
  return gulp.src([themeLessFiles, '!themes/variables.less', '!themes/mixins.less'])
    .pipe(less())
    .pipe(gulp.dest(themePath));
});

gulp.task('copy', function() {
    return gulp.src([distPath + '/**/*'])
      .pipe(gulp.dest(path.join(__dirname, 'docs', 'dist')));
});

gulp.task('build', function() {
  runSequence('jshint', 'test', 'themes', 'uglify', 'copy');
});

gulp.task('watch', function() {
  gulp.watch(srcFile, ['jshint']);
  gulp.watch(lessFiles, ['less']);
  gulp.watch(themeLessFiles, ['themes']);
});

gulp.task('default', ['build']);
