# mongod+express+MongoDb数据库应用笔记

#### 1、新键MongoDB数据库配合Robo 3T可视化工具：

- 无脑安装`robo3t`的可视化软件来管理`mongodb`数据库，没有表的概念，只有集合(类似于mysql的表))。

- 无脑安装 mongodb.msi。找到安装完后`mongodb`文件夹`bin`的路径，一般默认为`C:\Program Files\MongoDB\Server\3.2\bin`里面有多个exe文件。

- 在`bin`该目录下，打开`cmd`命令行，执行以下命令，该目录有数据连接此数据库，该目录没库就是创建数据库成功，

  ```
  mongod --dbpath [文件夹的路径]（文件路径是指要添加数据库的文件夹下）文件路径不能有任何空格
  如：mongod --dbpath C:\Users\asus\Desktop\YiGu_user\database
  ```

- 打开Robo 3T可视化工具，在Collections下新建数据表（create collections..）,命名数据表名。在该数据下右键点 `Insert Document`即开始写数据。数据格式例如：

  ```
      "num" : "445712",
      "date" : "2018-11-12",
      "url" : "https://v.qq.com/txp/iframe/player.html?vid=r07369a2xt4",
      "title" : "总有人谜之乐观？要知道，下一个可能就是你"
  ```

  

### 2、使用express的脚手架搭建后端

- 在项目文件夹下全局安装：

  `npm install -g express-generator@4`

- 在项目文件夹下用express命令创建应用架构

  ```
  express test(这里的test为文件夹名，也可以换成相对路径)
  cd test
  ```


### 3、安装各种模块

- 进入test文件夹安装依赖，推荐cnpm安装所有依赖

```
npm install
```

- 

- 安装`express`模块命令：`npm install express --save-dev`

- 安装mongodb模块与其依赖模块：

  ```
  npm install mongodb --save-dev
  npm install assert --save-dev
  ```

- 启动应用（每次修改后端代码需要重启服务：npm start）

  ```
  SET DEBUG=test:*//(text为文件夹名)
  npm start
  ```

- 访问在浏览器3000端口号

  `http://localhost:3000`

### 4、在项目文件夹下新建lib文件夹，放置一些自己封装的函数或者库函数；

现在我们放连接数据库的函数，命名文件为`addConnect.js`

```
const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
 
// 连接端口
const url = 'mongodb://localhost:27017';
 
//连接的数据库名
const dbName = 'local';
 
// 使用connect方法连接到服务器
// 封装
function query(callback){
    MongoClient.connect(url, function(err, client){
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

