var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'root',
    database: 'baidunews'
});
//获取后台所有新闻数据列表
router.get('/getnews', function(req, res, next) {
    try {
        //执行查询语句
        connection.query('SELECT * FROM `news`', function(err, rows) {
            res.json(rows);
        });
    } catch (e) {
        console.error('Error: ', e);
    }
});
//根据id获取当前所选新闻数据
router.get('/curNews', function(req, res, next) {
    var $id = req.query.newsid;
    try {
        //执行查询语句
        connection.query('SELECT * FROM `news` WHERE `id` = ?', [$id], function(err, rows) {
            // console.log(rows);
            res.json(rows);
        });
    } catch (e) {
        console.error('Error: ', e);
    }
});

//根据id获取当前所选新闻数据
router.post('/insertNews', function(req, res) {
    var newstitle = req.body.newstitle,
        newstype = req.body.newstype,
        newsimg = req.body.newsimg,
        newstime = req.body.newstime,
        newssrc = req.body.newssrc;
    $sql = "INSERT INTO `news` (`newstype`,`newstitle`,`newsimg`,`newstime`,`newssrc`) VALUES(?,?,?,?,?)";
    //执行查询语句
    connection.query($sql, [newstype, newstitle, newsimg, newstime, newssrc], function(err, result) {
        if (!err) {
            //console.log(result.insertId);
            res.json(result.insertId);
        }
    });
});

//确认更新新闻  
router.post('/updateNews', function(req, res, next) {
    var newsid = req.body.newsid,
        newstitle = req.body.newstitle,
        newstype = req.body.newstype,
        newsimg = req.body.newsimg,
        newstime = req.body.newstime,
        newssrc = req.body.newssrc,
        $sql = "UPDATE `news` SET `newstype`=?,`newstitle`=?,`newsimg`=?,`newstime`=?,`newssrc`=? WHERE `id`=?";
    //执行查询语句
    connection.query($sql, [newstype, newstitle, newsimg, newstime, newssrc, newsid], function(err, rows) {

        res.json(rows.changedRows);
    });
});
//确认删除新闻  
router.post('/deleteNews', function(req, res, next) {
    var newsid = req.body.newsid;
    $sql = "DELETE FROM `news` WHERE `news`.`id`=?";

    //执行查询语句
    connection.query($sql, [newsid], function(err, result) {

        res.json(result.affectedRows);
    });
});
module.exports = router;