var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('css',function () {
    gulp.src(['css/*.styl','ng/**/*.styl'])
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('Page/src/css'));
  })
