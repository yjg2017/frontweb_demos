var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由设置
var index = require('./routes/index');
var admin = require('./routes/admin');

//实例化express
var app = express();

// ejs模板引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/news', index);
app.use('/admin', admin);

// 如果客户端请求的是不存在的资源返回404
app.use(function(req, res, next) {
    //设置响应头
    res.status(404);
    //利用try{}catch{}防止重复返回
    try {
        return res.json('Not Found');
    } catch (e) {
        console.log('404 set header after sent');
    }

});

// 统一处理错误信息
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;