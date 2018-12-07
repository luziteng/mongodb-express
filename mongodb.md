# mongodb

nosql数据库，不需要sql语句的数据库，里面一切都是类似于JSON文件

- [mongodb教程](https://github.com/Wscats/node-tutorial/issues/20)
- [mongodb官方文档](https://www.npmjs.com/package/mongodb)

## 安装

- 双击安装`mongodb.msi`文件
- 找回安装完`mongodb`文件夹`bin`的路径

```
C:\Program Files\MongoDB\Server\3.2\bin
```

里面有多个exe文件

- 在`bin`该目录下，打开`cmd`命令行，执行以下命令，该目录有数据连接此数据库，该目录没库就是创建数据库成功，

```
mongod --dbpath [文件夹的路径]（文件路径是指要添加数据库的文件夹下）文件路径不能有任何空格
如：mongod --dbpath C:\Users\asus\Desktop\YiGu_user\database
```

- 安装`robo3t`的可视化软件来管理`mongodb`数据库，没有表的概念，只有集合(类似于mysql的表))

- 配合node来使用`mongodb`数据库,在项目目录下用cmd安装

- 由于MongoDB中的代码有`const assert = require('assert');`语句，所以要安装assert模块

- ```
  npm install mongodb --save-dev
  npm install assert --save-dev
  ```

  新建`server.js`,执行以下代码(建立数据库连接)

  ```
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
   
  // Connection URL
  const url = 'mongodb://localhost:27017';
   
  // Database Name
  const dbName = '1806';
   
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);//后端报错ReferenceError: assert is not defined，将此句代码删除掉后正常
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    client.close();
  });
  ```

  #### （../lib/addRegister.js）

  ```
  const MongoClient = require('mongodb').MongoClient;
  // const assert = require('assert');
   
  // 连接端口
  const url = 'mongodb://localhost:27017';
   
  //连接的数据库名
  const dbName = 'yigu';
   
  // 使用connect方法连接到服务器
  // 封装
  function query(callback){
      MongoClient.connect(url, function(err, client){
        // assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        callback(db);
        client.close();
  })
  }
  //自定义模块配合require和module使用
  module.exports ={
      query
  }
  ```

  **查看数据**

  ```
  var express = require('express');
  var router = express.Router();
  var db =require('../lib/addRegister.js');
  
  router.post('/FindRegister', function(req, res, next) {
      console.log(req.body);
      console.log(db);
      let userName =  req.body.username;
      db.query(function(db){
          db.collection('user').find({
           "username":userName//此处键值需要加引号	find({})为空时查到数据库所有数据
          }).toArray(function (err, docs){
              // assert.equal(err, null);//后端报错ReferenceError: assert is not defined，将此句代码删除掉后正常
              console.log("Found the following records");//打印查找状态的提示
              console.log(docs);//打印结果
              res.send(docs);//给前端返回结果
          });
      })
    
  });
  ```

  增加数据

  ```
  router.post('/AddRegister', function(req, res, next) {
  
      db.query(function(db){
          db.collection('user').insertMany([req.body], function(err, result) {
              console.log("Inserted 1 document into the collection");
              res.send(result);
          });
      })
    
  });
  ```

  

**改数据**

```
router.post('/alter', function(req, res, next) {

    console.log(req.body);
    var gid = mongoose.Types.ObjectId(req.body.id);//要和传过来的数据的键值名相对应,req.body._id,错误
    console.log(gid);
    db.query(function(db){
    db.collection('list').update({ '_id' : gid }
    , { $set: { 
          "goodsName":req.body.goodsName,
          "price":req.body.price,
          "images":req.body.images
     } }, function(err, result) {
        console.log("Updated the document with the field a equal to 2");
        res.send(result);
      });  
    })
});
```

**删除数据**

```
    var fname = req.body.goodsName;
    console.log(fname);
    db.query(function(db){
        db.collection('list').deleteOne({ goodsName : fname }, function(err, result) {

          console.log("Removed the document with the field a equal to 3");
          
          res.send(result);
        });    
    })
});
```



