var gulp = require('gulp'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  livereload = require('gulp-livereload');

gulp.task('css',function(){
  gulp
    .src([
       'assets/css/style.css'
      ])
    .pipe(concat('all.css'))
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('assets/css/'))
});

gulp.task('js', function() {
  gulp
    .src([
       'vendor/jquery/dist/jquery.js',
       'assets/js/script.js'
      ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('assets/js/'))
});

gulp.task('watch',function(){
  livereload.listen();
  gulp.watch(['assets/js/**/*.js', '!assets/js/all.min.js'], ['js']).on('change', livereload.changed);
  gulp.watch(['assets/css/**/*.css', '!assets/css/all.min.css'], ['css']).on('change', livereload.changed);
  gulp.watch(['*.html','pages/*.html']).on('change', livereload.changed);
})

gulp.task('default',['css','js','watch']);