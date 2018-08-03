'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var connect = require('gulp-connect');
var path = require('path');

const paths = {
  assets_src: [
    './src/assets/images/**/*'
  ],
  assets_dist: './dist/',
  pages_src: './src/scss/pages/**/*.html',
  bootstrap_sass: './node_modules/bootstrap/scss/bootstrap.scss',
  pages_dist: './dist/',
  style_watch: [
    './src/scss/components/**/*.scss',
    './src/scss/**/*.scss'
  ],
  style_master: './src/scss/main.scss',
  style_dist: './dist/css'
};

gulp.task('style', function () {
  return gulp
    .src([paths.style_master, paths.bootstrap_sass])
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.style_dist))
    .pipe(connect.reload());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src([ 'node_modules/bootstrap/dist/js/bootstrap.min.js','src/main.js'])
        .pipe(gulp.dest('dist/js'))
 });

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.style_watch, ['style']);
  gulp.watch(paths.pages_src, ['html']);
});

gulp.task('html', function () {     
    gulp.src(paths.pages_src)
        .pipe(gulp.dest(paths.pages_dist));
  });

gulp.task('copy', function () {
  gulp.src(paths.assets_src, { 'base': './src/assets' })
      .pipe(gulp.dest(paths.assets_dist));
});

gulp.task('default', [ 'style', 'html', 'js', 'copy', 'watch', 'connect' ]);
