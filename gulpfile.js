'use strict';

// Include gulp
var gulp   = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var concat = require('gulp-babel');

// Process JavaScript files and return the stream
gulp.task('pride', function () {
  return gulp.src([
      './source/libraries/underscore.js',
      './source/libraries/reqwest.js',
      './source/libraries/pride.js',
      './source/pride_init.js'
    ])
    .pipe(concat('pride.js'))
    .pipe(gulp.dest('./'))
});

var browserified = transform(function(filename) {
  var b = browserify(filename);
  return b.bundle();
});

gulp.task('react', function() {
  return gulp.src([
    './source/components/datastores.js',
    './source/react_init.js'
  ])
  .pipe(concat('react.js'))
  .pipe(gulp.dest('./'))
  .transform("babelify", {presets: ["es2015", "react"]})
});

gulp.task('store', function() {
  return gulp.src([
    './source/store/actions.js',
    './source/store/reducers.js',
    './source/store/index.js'
  ])
  .pipe(concat('store.js'))
  .pipe(gulp.dest('./'))
  .transform("babelify", {presets: ["es2015", "react"]})
});

gulp.task('javascript', ['pride', 'react', 'store'])

// Static Server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("source/**/*.js", ['javascript']);
  gulp.watch("source/**/*.js").on("change", browserSync.reload);
});

gulp.task('default', ['serve']);
