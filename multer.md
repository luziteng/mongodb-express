# multer

[Multer文档](https://www.npmjs.com/package/multer)

Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。

**注意: Multer 不会处理任何非 `multipart/form-data` 类型的表单数据。** 

安装命令：`npm install multer --save-dev`

## 使用

Multer 会添加一个 `body` 对象 以及 `file` 或 `files` 对象 到 express 的 `request` 对象中。 `body` 对象包含表单的文本域信息，`file` 或 `files` 对象包含对象表单上传的文件信息。

## 美化input type=file

当然原生的input可不是长的这个样子，这里我们其实是把input的透明度设置为0，然后用span标签来显示上传文件字样，然后把它们重叠到一块就行了。 

## fileReader对象

readAsDataURL() 方法。//将文件读取为base64的格式，也就是可以当成图片的src
result 属性 //将读取的数据保存在result里。
progress 事件 //定时触发，来获取当前已上传文件的大小，如进度条
loade 事件 //文件上传完成时触发

loadend 事件 //文件上传完成时（不管成功、失败）触发



### 预览代码

```
//如果在html内给元素绑定事件(内联事件).如果在js中直接定义action函数,是可以的;但是套在$(function(){})中问题出现了ReferenceError: action is not defined.
//作用域的问题调用 selectFile() 函数的时候是在全局作用域找这个函数的，无法访问闭包里面的函数
//selectFile()都包在一个匿名函数里了还指望全局作用域能找到它？把你js部分头尾两行砍掉吧

//以下预览代码， selectFile(obj)放在： <input type="file" name="photo" id="fileNode"  onchange="selectFile(this)"/>（this指向input#fileNode）

function selectFile(obj){
        var formdata = new FormData();//FormData ==>表单数据,能自动把表单数据拼接打包,当ajax发送数据时,发送打包的数据;还可以使用FormData对象的append(key,value)添加数据;FormData还可以自动帮忙打包文传送件数据,后台通过$_FILES数组接收;说明FormData对象既可以打包发送表单的数据,也可以手动append数据
        formdata.append('photo',obj.files[0]);
        console.log(formdata);
        var src = obj.files[0].name;
        // console.log(src);
        formart = src.split(".")[1];//利用切割，拿到上传文件格式
          var file =obj.files[0];
          console.log(file)
    //*****************图片预览********************//
    function readPhoto(){
        var reader = new FileReader();//FileReader对象允许web应用程序异步读取存储在用户计算机上的文件(或原始数据缓冲区)的内容，使用文件或Blob对象来指定要读取的文件或数据。
        console.log(reader);
       // reader.readAsDataURL(file);//readyAsDataURL()读取为base64图片编码
        // reader.onload(function(){
        //     $(".pho").attr("src",this.result);//获取图片路径
        //     console.log(this.result);
        // });
        
         reader.onload = (e) => {
          $(".pho").attr("src",e.target.result);
            // console.log(e.target.result);
        }
            if (file){//如果打开文件执行
                reader.readAsDataURL(file);//readyAsDataURL()读取为base64图片编码
                } else {
                 $(".pho").attr("src","");
                }
    }
         
        
    var size = Math.round(file.size / 1024 / 1024);
        if(formart =="jpg"||formart == "pgn"||formart =="gif"){
                if(size>3){
                    alert('图片大小不得超过3M');
                    return;
                }else{
                   readPhoto();
                }
            }else{
                alert('图片格式不正确');
                return;
        }
```

### 上传文件及发送增加请求

```
$("#ok").click(function(){
       // imgSrc = $(".pho").attr("src");
        var  imgSrc = new FormData();
        imgSrc.append('photo',$("#fileNode")[0].files[0]);
            console.log(imgSrc);
        $.ajax({
                url:"http://localhost:3000/files/uploads",
                type:'post',//文件传输限定 form 的 method 必须为 POST 
                data:imgSrc,
                contentType: false,//它是代表发送信息至服务器时内容编码类型,通俗点说就是告诉服务器从浏览器提交过来的数据格式。我们在 ajax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
                processData: false,
                success:function(data){
                    console.log(data.data);//传回来的数据最好打印，不然容易犯自以为是的错误
                    $.ajax({
                            type:"post",
                            url:"http://localhost:3000/files/Addgoods",
                            data:{
                                goodsName:$(".goods_name").val(),
                                price:$(".goods_price").val(),
                                images:data.data
                            },
                            success:function(){
                                alert("添加商品成功");
                            }
                        })
                    }
                })
    })
```

### 后端nodejs

```
var express = require('express');
var router = express.Router();

var multer = require('multer');
var db =require('../lib/addRegister.js');
 var a="";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')//destination 是用来确定上传的文件应该存储在哪个文件夹中。
  },
 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");

        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
// console.log(file);
console.log(file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
// a=file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1];传回a不受用，此时a的值相比传进文件夹的文件名又不相同，因为代码执行需要时间，所以时间戳不一样了，名字自然不一样
    }
 
})
var upload = multer({ storage: storage });
router.post('/uploads', upload.single('photo'), function (req, res, next) {
    // console.log(res);
    next();
}, function (req, res, next) {
  console.log(req.file.path);
  // url=req.file.path;// 存入数据库的路径变为"public\\images\\photo-1540724530783.jpg"，所以需要截取。
   var url =  req.file.path.slice(14);

    console.log(url)
  //将其发回客户端
  res.json({
    code : 1,
    data : url
  });
  res.end();
});
//***************增加商品*************************//
router.post('/Addgoods', function(req, res, next) {

    db.query(function(db){
        db.collection('list').insertMany([req.body], function(err, result) {
            console.log("Inserted 1 document into the collection");
            res.send(result);
        });
    })
  
});

module.exports = router;
```

