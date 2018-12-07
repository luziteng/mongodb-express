# node js

##### 	概念：Node.js®是一个基于`Chrome V8`引擎的JavaScript运行时；

​		安装后在cmd中执行：node -v。（查看版本号）

#### 前端与后端

### 前端（浏览器端）

> 要运行JS，必须借助于HTML文件，没有HTML文件和浏览器环境，那JS是无法运行     （要有HTML文件，也要有浏览器环境）
> 浏览器=界面+控制台
> JS是必须运行在浏览器上，所以只能控制浏览器


### 后端（服务器端）

> 要运行JS，（既不需要HTML文件，也不需要浏览器环境，只需要Node环境），node替代了HTML文件，也替代了浏览器
> 服务器(node)=控制台
> JS有了node环境，可以运行在非浏览器环境下，因为node是装在系统上，所以JS可以操作系统
> node(浏览器的控制台===chrome的V8引擎)<浏览器



### 运行--如何使用node

- 写一份JS代码
- 在命令行定位到此代码的位置，运行命令`node JS文件的名字.js`命令
- 运行 node Js 文件一定要在当前文件夹下执行`node JS文件的名字.js`命令

# 模块化

# 自定义模块化

### 前端

- 写多条`<script>引入JS`在html分开引入

- 利用`require.js`

  `<script src="jquery.js"></script>`
  `<script src="cookie.js"></script>`
  `<script src="module.js"></script>`

### node（后端）

它没有html，所以需要借助于两个JS方法

导出，借助于`module.exports

```
function plus(a, b) {
	return a + b
}

function sub(a,b){
	return a-b
}

module.exports = {
	plus,
	sub
}
```

导入,借助于`require`,建议用相对路径

```
var tool = require("./plus.js");
console.log(tool);
var sum1 = tool.plus(9,8);
console.log(sum1);
var sum2 = tool.sub(9,8);
console.log(sum2);
```

`导入  module.exports  导出  require`   要结合使用（自定义模块）

# 内置模块

不需要自己写，就是node环境自带，它自己写好给你的，就可以引入

Node拿来作为PHP的一种替代（多一种可选的方案）

PHP能做的，Node也能做

| 模块       | 名字 |
| ---------- | ---- |
| 读写文件   | fs   |
| 创建服务器 | http |
| 查看系统   | os   |
| 压缩文件   | zip  |
| ...        | ...  |

其他模块参考 [node官网内置模块API文档](https://nodejs.org/dist/latest-v8.x/docs/api/)

### HTTP

http超文本传输协议
前端最多就是ajax(http协议的一种前端实现方案)  GET/POST

| GET          | POST         |
| ------------ | ------------ |
| 参数在url上  | 参数在请求体 |
| 有可能有长度 | 没长度限制   |
| 不安全       | 安全         |

| 状态码 |                                     |
| ------ | ----------------------------------- |
| 1xx    | 开始执行                            |
| 2xx    | 成功                                |
| 3xx    | 重定向                              |
| 4xx    | 客户端错误,浏览器端（前端代码错误） |
| 5xx    | 服务端（后端）                      |

#### apache(wamp集成环境)+php

```
window
apache
mysql
php
```

## 创建服务器

![](E:\千锋H5\上课\阶段三\node-master\day1\node服务器请求和响应的示意图.png)

```
此法为原生写法：
var http = require('http');

console.log(http);

var server = http.createServer(Function(request,response){

	response.end("hello world");

})

server.listen(12345);//端口号(0,65535)，apache的默认端口为8080，不设此端口

console.log("启动服务器");
说
```

# 第三方模块

1、并非node js自带，需要从npm网站中下载，下载后，使用第三方一般引入也是 require（'模块名'）；如引入request模块。 `var request = require('request')`;

2、在安装模块时，可以现在当前目录下执行命令： npm init       --实现初始化。 执行命令后会生成一个package.json 文件，可以根据里面的内容知道本项目所用到的所有第三方模块： 

```
"devDependencies":{
    "request":"^2.88.0"//request的模块版本
    .........(其他使用到的模块名)
},
```

devDependencies中记录了本项目使用的模块名。

3、移植或下载项目文件时（如上传至SVN或GIT服务器上），不包含 node_modules 文件，由于node_modules文件包含了本项目用到的各个模块，文件太大。可以根据package.json，知道本项目用到的模块。

4、package.json文件中的"devDependencies": {"cheerio": "^1.0.0-rc.2"},记录次要依赖模块。

5、建议安装cnpm，命令：`npm install cnpm -g --registry=https://registry.npm.taobao.org` ，安装以后，其他第三方模块可以使用命令 ：cnpm installl ***，安装。

6、在有package.json文件的文件目录下（devDependencies中记录有模块名），执行命令：npm install 后会把所有得模块重新下载到当前目录文件夹。

7、卸载模块 执行命令： npm uninstall ***（加模块名）

8、如果不想链接jquery文件，可以安装jquery模块，在npm网站上查询。

[npm网站](https://www.npmjs.com/package/npm)

[runoob菜鸟教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)

# 异步

### 前端（浏览器端）

前端异步只有一下几种情况是异步

```
ajax xmlhttprequest
setInterval/setTimeout
jsonp
```

### 后端（服务器端node）

比前端多很多，很多方法都是异步的

```
fs.readFile //异步
fs.readFileSync //同步
```

异步一般配合回调函数,回调函数能让异步变得有意义

同步比异步少了回调函数

同步阻塞，相对稳定，不需要回调

异步非阻塞，相对不稳定，配合回调才有意义

```js
//同步
var data = fs.readFileSync('./test.txt');
console.log(data.toString());

//异步
fs.readFile('./test.txt',function(err,data2){
	console.log(data2.toString());
});
```

# 回调嵌套

如果出现多个回调嵌套的时候，建议是用`promise`来去解决这个回调

```js
function buyPizza() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("买披萨");
			resolve()
		}, 1000);
	})
}
function buyDrink() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("买饮料");
			resolve()
		}, 1000);
	})
}
function eatMeal() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("吃东西");
			//resolve()
		}, 1000);
	})
}
buyPizza().then(buyDrink).then(eatMeal);
```

# request

```
//=======爬取整个网页信息===========//

var request = require('request');
var fs = require('fs');
request('http://www.umei.cc/', function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred如果出现错误，请打印该错误
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 如果收到响应，请打印响应状态码(100~500),后端到前端的状态：response。（response；响应头，响应体）
fs.writeFile('test.html',body,function(err){
    console.log("成功保存");//写入文件
});
  console.log('body:', body); // 打印出body中内容

});
console.log("开始请求");
```

任何前端请求都有

请求头（浏览器信息），请求体（POST请求，请求参数会放在这个地方）   用户不可见的

响应头（服务器信息），响应体（页面的内容，用户可见）

- [request模块文档](https://www.npmjs.com/package/request)

### 爬虫

爬取网站的内容，然后可以保存到本地，或者分析页面获取有价值的信息



```js
var request = require('request');
var fs = require('fs');
request('http://www.umei.cc/', function(error, response, body) {
	//console.log('error:', error); // Print the error if one occurred
	//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the Google homepage.
//	fs.writeFile('test.html', body, function(err) {
//		console.log("成功保存")
//	})
});
console.log("开始请求");
```

### cheerio

[cheerio使用文档](https://www.npmjs.com/package/cheerio)

```
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
request('http://www.27270.com/ent/meinvtupian/', function(error, response, body) {
	//console.log('body:', body); // Print the HTML for the Google homepage.
	const $ = cheerio.load(body);
	$("img").each((i,e)=>{
		console.log($(e).attr("src"))
		var src = $(e).attr("src");
		request(src).pipe(fs.createWriteStream(`./imgs/${i}.png`))
	})
});

console.log("开始请求");
```

并非所有网站都是能爬，有些网站是防爬虫，还有一些网页是前端JS动态生成