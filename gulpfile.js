var path = require('path')
    ,gulp =  require('gulp')
    ,browserify = require('gulp-browserify')
    ,connect =  require('gulp-connect')
    ,less = require("gulp-less")
    ,ejs = require("gulp-ejs")
    ,clean = require('gulp-clean')
    ,src = "./src"
    ,dest = "./dist";

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
  gulp.src([path.join(src, "scripts/*.js"), '!' + path.join(src, "scripts/_*.js")], {read: false })
    .pipe(browserify({
      transform: ['babelify']
    }))
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
