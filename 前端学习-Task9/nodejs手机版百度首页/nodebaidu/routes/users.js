var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createPool({
	host:'localhost',
  	port:3308,
  	user:'root',
  	password:'root',
  	database:'baidunews'
});
/* GET users listing. */
router.get('/getnews', function(req, res, next) {
  try {
        //执行查询语句
        connection.query('SELECT * FROM `news`', function(err, rows) {
            res.json(rows);
        });
    }catch(e){
    	console.error('Error: ',e);
    }
});

module.exports = router;
