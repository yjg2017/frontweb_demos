var express = require('express');
var router = express.Router();

var mysql = require('mysql');

/* 获取主页新闻数据请求 */
router.get('/', function(req, res, next) {
    var newstype = req.query.newstype;
    //创建数据库连接字符串
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3308,
        user: 'root',
        password: 'root',
        database: 'baidunews'
    });
    //与数据库建立连接
        connection.connect();
        var sql = '';
        if (newstype == "all") {
            sql = 'SELECT * FROM `news`';
        } else {
            sql = 'SELECT * FROM `news` WHERE `newstype` = ?';
        }
        //执行查询语句
        connection.query(sql, [newstype], function(err, rows, fields) {
            res.json(rows);
        });
});

module.exports = router;