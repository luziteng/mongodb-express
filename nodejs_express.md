# express

[npm的express文档](https://www.npmjs.com/package/express)

Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。使用 Express 可以快速地搭建一个完整功能的网站。 

Express 框架核心特性：

- 可以设置中间件来响应 HTTP 请求。
- 定义了路由表用于执行不同的 HTTP 请求动作。
- 可以通过向模板传递参数来动态渲染 HTML 页面。

### 安装与运行

1、终端输入命令安装，这与其他模块一样 

命令：cnpm install express --save-dev

2、终端输入命令安装，这与其他模块一样 

```
var express = require("express");
var app = express();//初始化
```

切换不同的路由，就进入不同的逻辑，
也就是浏览器输入不同路径，页面就有不同的返回结果

```
var express = require('express')
var app = express()
app.get('/', function (req, res) {//写入不同的路径
  res.send('Hello World')
})
app.get('/home', function (req, res) {//写入不同的路径
  res.send('home页面')
})
app.listen(3000);
//在浏览器查询 localhost：3000 页面输出"hello world"文字；
//在浏览器查询 localhost :3000 页面显示"home页面"文字;
```

### **request** 和 **response** 对象的具体介绍：

**Request 对象** - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

1. req.app：当callback为外部文件时，用req.app访问express的实例
2. req.baseUrl：获取路由当前安装的URL路径
3. req.body / req.cookies：获得「请求主体」/ Cookies
4. req.fresh / req.stale：判断请求是否还「新鲜」
5. req.hostname / req.ip：获取主机名和IP地址
6. req.originalUrl：获取原始请求URL
7. req.params：获取路由的parameters
8. req.path：获取请求路径
9. req.protocol：获取协议类型
10. req.query：获取URL的查询参数串
11. req.route：获取当前匹配的路由
12. req.subdomains：获取子域名
13. req.accepts()：检查可接受的请求的文档类型
14. req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
15. req.get()：获取指定的HTTP请求头
16. req.is()：判断请求头Content-Type的MIME类型

**Response 对象** - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

1. res.app：同req.app一样
2. res.append()：追加指定HTTP头
3. res.set()在res.append()后将重置之前设置的头
4. res.cookie(name，value [，option])：设置Cookie
5. opition: domain / expires / httpOnly / maxAge / path / secure / signed
6. res.clearCookie()：清除Cookie
7. res.download()：传送指定路径的文件
8. res.get()：返回指定的HTTP头
9. res.json()：传送JSON响应
10. res.jsonp()：传送JSONP响应
11. res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
12. res.redirect()：设置响应的Location HTTP头，并且设置状态码302
13. res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
14. res.send()：传送HTTP响应;返回数据,默认会转为字符串,编码为utf8* res.sendFile();返回文件*  
15. res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
16. res.set()：设置HTTP头，传入object可以一次设置多个头
17. res.status()：设置HTTP状态码
18. res.type()：设置Content-Type的MIME类型



## express的脚手架

全局安装

```bash
npm install -g express-generator@4
```

在一个文件夹里面用`express`命令创建应用架构

```bash
express test(这里的test为文件夹名，也可以换成相对路径)
cd test
```

进入test文件夹安装依赖，推荐cnpm安装所有依赖

```bash
npm install
```

启动应用（修改后端代码需要重启服务：npm start）

```bash
SET DEBUG=test:*//(text为文件夹名)
npm start
```

访问在浏览器3000端口号

`http://localhost:3000`

### 创建路由

进入到test目录的routes文件夹,然后复制`users.js`

你可以改变`/home`这里的路径

```bash
var express = require('express');
var router = express.Router();
router.get('/home', function(req, res, next) {
  res.send('hello world');
});
module.exports = router;
```

在`app.js`添加以下两条，该路由就完成了

```js
var homeRouter = require('./routes/home');
//code
app.use('/test', homeRouter);
```

访问该路径

`http://localhost:3000/test/home`

# mysql

连接数据库

//select * from students where username = 

```
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'lemon',
	password: '123456',
	database: '1806'//数据库名

});

connection.query('INSERT INTO students SET ?', [{
	username: req.body.username,
	password: req.body.password
}], function(error, results, fields) {
	if(error) throw error;
	res.send("success");
});
connection.end();//关闭数据库。存在异步执行的问题，可能请求数据未完成，就关闭数据库
```

