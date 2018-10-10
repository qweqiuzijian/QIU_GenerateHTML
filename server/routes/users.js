var express = require('express');
var router = express.Router();
// let mysql = require('mysql')
let fs = require('fs')
let path = require('path')

// var connection = mysql.createConnection({     
//   host     : 'localhost',       
//   user     : 'root',              
//   password : '19920707',       
//   port: '3306',                   
//   database: 'test_sql', 
// }); 
// connection.connect()
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('用户中心');
});
router.post('/registered', function(req, res, next) {
  res.send('注册用户');
});
router.post('/editInfo', function(req, res, next) {
  res.send('修改资料');
});
router.post('/login', function(req, res, next) {
  res.send('用户登录');
});
module.exports = router;
