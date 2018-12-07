var express = require('express');
var router = express.Router();
var db =require('../lib/addConnect.js');//引入操作数据库的文件，自定义模块使用相对路径（addRget即拿到的是addRegister.js文件下的query方法）
/* GET users listing. */
router.post('/FindRegister', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//跨域问题
    console.log(req.body);
    console.log(db);
    let userName =  req.body.name;
    db.query(function(db){
        db.collection('user').find({
         "name":userName//此处键值需要加引号
        }).toArray(function (err, docs){
            // assert.equal(err, null);//后端报错ReferenceError: assert is not defined，将此句代码删除掉后正常
            console.log("Found the following records");//打印查找状态的提示
            console.log(docs);//打印结果
            res.send("true");//给前端返回结果
        });
    })
  
});
//************注册，将数据加入数据库***********//
router.post('/AddRegister', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//跨域问题
    db.query(function(db){
        db.collection('user').insertMany([req.body], function(err, result) {
            console.log("Inserted 1 document into the collection");
            res.send(result);
        });
    })
  
});
//***********账户密码验证*******************//
router.post('/UseLogin', function(req, res, next){
    console.log(req.body);
    console.log(db);
    var users = req.body.username;
    var pwd =req.body.pwd;
    let userName =  req.body.username;
    db.query(function(db){
        //无法查找到前端传过来的两个值，当查询到username，数据库中存在时就返回了整个数组，不再管password
        db.collection('user').find({"username":users},{"password":pwd}).toArray(function (err, docs){
            console.log(docs);
            res.send(docs);//给前端返回结果
        });
    })
});

module.exports = router;


