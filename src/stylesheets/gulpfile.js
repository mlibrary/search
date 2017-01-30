'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

// Compile sass into CSS
gulp.task('sass', function() {
  return gulp.src("./main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./"));
});

gulp.task('sass:watch', function () {
  gulp.watch('./**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);
