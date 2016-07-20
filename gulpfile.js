var path          = require('path')
var fs            = require('fs');
var browserify    = require('browserify');
var through2      = require('through2');
var babelify      = require('babelify');
var gulp          = require('gulp');
var uglify        = require('gulp-uglify');
var connect       = require('gulp-connect');
var less          = require("gulp-less");
var ejs           = require("gulp-ejs");
var clean         = require('gulp-clean');

var src = "./src";
var dest = "./dist";

function lessTask() {
  gulp.src([path.join(src, "styles/**/*.less"), '!' + path.join(src, "styles/**/_*.less")])
    .pipe(less())
    .pipe(gulp.dest(path.join(dest, "styles")))
    .pipe(connect.reload());
}

function ejsTask() {
  gulp.src([path.join(src, "*.ejs"), '!' + path.join(src, "_*.ejs")])
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());

  gulp.src([path.join(src, "partials/*.ejs"), '!' + path.join(src, "partials/_*.ejs")])
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(path.join(dest, 'partials')))
    .pipe(connect.reload());
}

function es6Task() {
  gulp.src([path.join(src, "scripts/*.js"), '!' + path.join(src, "scripts/_*.js")])
    .pipe(through2.obj(function (file, enc, next){
      browserify(file.path)
        .transform(babelify, {
          presets: ["es2015"]
        })
        .bundle(function(err, res){
          file.contents = res;
          next(null, file);
        });
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(dest, "scripts")))
    .pipe(connect.reload());
}

function cleanTask() {
  gulp.src(dest, {read: false}).pipe(clean({force: true}));
}

function connectTask() {
  connect.server({
    root: dest,
    port: 8080,
    livereload: true
  });
}

function watchTask() {
  gulp.watch(['./src/*.ejs', './src/partials/**/*.ejs'], ['ejs']);
  gulp.watch(['./src/scripts/**/*.js'], ['es6']);
  gulp.watch(['./src/styles/**/*.less'], ['less']);
}

gulp.task('connect', connectTask);
gulp.task('less', lessTask);
gulp.task('ejs', ejsTask);
gulp.task('es6', es6Task);
gulp.task('clean', cleanTask);
gulp.task('dist', ['ejs', 'es6', 'less'])
gulp.task('watch', watchTask);
gulp.task('default', ['dist', 'watch', 'connect']);
