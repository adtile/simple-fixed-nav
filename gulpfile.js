var path = require('path')
    ,gulp =  require('gulp')
    ,babel = require('gulp-babel')
    ,connect =  require('gulp-connect')
    ,less =     require("gulp-less")
    ,src = "./src"
    ,dest = "./dist";
 
gulp.task('connect', function() {
  connect.server({
    root: src,
    port: 8080,
    livereload: true
  });
});

gulp.task("less", function () {
  gulp.src(path.join(src, "styles/**/*.less"))
    .pipe(less())
    .pipe(gulp.dest(path.join(dest, "styles")))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src(path.join(src, "*.html"))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(path.join(src, "scripts/*.js"))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.join(dest, "scripts")))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.html'], ['html']);
  gulp.watch(['./src/scripts/**/*.js'], ['js']);
  gulp.watch(['./src/styles/**/*.less'], ['less']);
});
 
gulp.task('default', ['less', 'js', 'html', 'watch', 'connect']);