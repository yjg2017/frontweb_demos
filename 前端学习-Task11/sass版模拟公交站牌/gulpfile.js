var gulp = require('gulp'),
    compass = require('gulp-compass'),
    mincss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync').create();
/**
 * 编译sass
 */
gulp.task('compress-css', function() {
    var options = {
        config_file: 'config.rb',
        css: 'stylesheets',
        sass: 'sass'
    };
    gulp.src('./sass/*.scss')
        .pipe(compass(options))
        .pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(mincss())
        .pipe(gulp.dest('./stylesheets'))
        .pipe(browsersync.stream());
});
/**
 * 启动server
 */
gulp.task('server', function() {
    browsersync.init({
        server: './'
    });
    gulp.watch('./sass/*.scss', ['compress-css']);
    gulp.watch('./*.html').on('change', browsersync.reload);
})
/**
 * gulp默认任务
 */
gulp.task('default', ['server']);