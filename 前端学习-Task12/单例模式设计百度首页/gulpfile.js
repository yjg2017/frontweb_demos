var gulp = require('gulp'),
    concat = require('gulp-concat') //--多文件合并
    ,
    cleanCSS = require('gulp-clean-css') //--压缩css
    ,
    uglify = require('gulp-uglify') //-- 压缩js
    ,
    imageMin = require('gulp-imagemin') //-- 压缩图片
    ,
    pngquant = require('imagemin-pngquant') //--深度压缩
    ,
    htmlMin = require('gulp-htmlmin') //--压缩html
    ,
    del = require('del') //删除所有文件
    ,
    minifyCSS = require('gulp-minify-css') //压缩CSS
    ,
    rev = require('gulp-rev') //对文件名加MD5后缀
    ,
    revCollector = require('gulp-rev-collector') //路径替换
    ,
    changed = require('gulp-changed') //--检查改变状态
    ,
    browserSync = require('browser-sync').create(); //浏览器实时刷新
//源文件目录 
var srcDir = './src';
//输出目录
var buildDir = './build';

//清空输出目录
gulp.task('delete', function(cb) {
    return del([buildDir + '/*', '!' + buildDir + '/images'], cb); //除了images文件夹外全部删除
});

//压缩js文件,并生成md5后缀的js文件
gulp.task('compress-js', function() { //- 创建一个名为compress-js的task
    gulp.src([srcDir + '/scripts/**/*.js']) //- 需要处理的js文件，放到一个字符串数组里
        .pipe(changed(buildDir + '/scripts/*.js'))
        .pipe(uglify()) //- 压缩文件
        .pipe(rev()) //- 文件名加MD5后缀
        .pipe(gulp.dest(buildDir + '/scripts')) //- 另存压缩后的文件
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildDir + '/rev-js')) //- 将rev-manifest.json保存到 rev-js 目录内
        .pipe(browserSync.reload({stream:true}));
});

/*压缩css文件，并生成MD5后缀的新CSS文件*/
gulp.task('compress-css', function(callback) {
    gulp.src([srcDir + '/styles/*.css'])
        .pipe(changed(buildDir + '/styles/*.css'))
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest(buildDir + '/styles')) //输出到build目录
        .pipe(rev.manifest()) //生成一个rev-manifest.json
        .pipe(gulp.dest(buildDir + '/rev-css'))
        .on('end', function() {
            console.log('compress-css has been completed!......');
            callback();
        }).pipe(browserSync.reload({stream:true}));
});

/*压缩html文件并将html内的link标签和script标签引用的css,js，输出到指定目录*/
gulp.task('rev-html', ['compress-css', 'compress-js'], function() {
    var options_htmlmin = {
           removeComments: true,//清除HTML注释
           collapseWhitespace: true,//压缩HTML
           removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
           removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
           minifyJS: true,//压缩页面JS
           minifyCSS: true//压缩页面CSS
       };
    gulp.src([buildDir + '/rev-css/*.json', buildDir + '/rev-js/*.json', srcDir + '/index.html'])
        .pipe(changed(buildDir + '/index.html'))
        .pipe(htmlMin(options_htmlmin))
        .pipe(revCollector()) //执行文件内的css,js名称替换
        .pipe(gulp.dest(buildDir + '/')) //替换后的html文件输出目录
        .pipe(browserSync.reload({stream:true}));
});

/*压缩图片*/
gulp.task('compress-img', function() {
    var options_img = {
        optimizationLevel: 7,
        progressive: true, // 无损压缩JPG图片
        svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
        use: [pngquant()] // 使用pngquant插件进行深度压缩
    };
    gulp.src(srcDir + '/images/*.*')
        .pipe(changed(buildDir + '/images'))
        .pipe(imageMin(options_img))
        .pipe(gulp.dest(buildDir + '/images'))
        .pipe(browserSync.reload({ stream: true }));
});
//启动热更新
gulp.task('server', ['delete', 'rev-html', 'compress-img'], function() {

    var option_browsersync = {
        port: 9000,
        server: {
            baseDir: ['build']
        }
    };
    
    browserSync.init(option_browsersync);
    //gulp.start('rev-html', 'compress-img');

});

gulp.task('default', ['server']);