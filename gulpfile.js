const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "project"
        }
    });
});

gulp.task('styles',function(){
    return gulp.src("project/sass/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("project/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("project/sass/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch('project/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch','server','styles'));
