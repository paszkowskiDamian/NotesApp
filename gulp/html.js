var gulp = require('gulp');

gulp.task('html',function () {
    gulp.src(['ng/**/*.html'])
    .pipe(gulp.dest('Page/assets/templates'))
  })

  