var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var fs = require('fs');
var webserver = require('gulp-webserver');

fs.readdirSync(__dirname + '/gulp').forEach((task)=>{
    require('./gulp/'+ task);
} );


gulp.task('watch:css', ()=>{
    gulp.watch('ng/**/*.styl',['css']);
    gulp.watch('css/**/*.styl',['css']);
})

gulp.task('watch:js',['js'], ()=>{
    gulp.watch('ng/**/*.js',['js']);
} );

gulp.task('watch:html',()=>{
    gulp.watch('ng/**/*.html',['html']);
})

gulp.task('webserver', function() {
  gulp.src('Page')
    .pipe(webserver({
      fallback: 'index.html',
      port: '3000',
      livereload: true
    }));
});

gulp.task('dev',['watch:js','watch:html','watch:css','webserver']);