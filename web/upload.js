var express = require('express');
var multer  = require('multer');
  var upload = multer({ dest: 'html/avatar' });
 var  util = require('util');
var router = express.Router();

//var qiniu = require('qiniu/examples/form_upload_simple');

var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = '人文地图图片上传',
    AVATAR_UPLOAD_FOLDER = 'html/avatar/',
    domain = "/";
	//获取当天天数作位文件夹
//var myDate = new Date();  
 router.post('/uploadersss', function(req, res) {
	 //console.log('接收的请求对象=',req);
	 console.log('接收的文件对象=',req);
	 
	  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  /*form.parse(req, function(err, fields, files) {
	  
	   if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    console.log('接收的文件对象=',files);
	  
	  
	 
  });*/
	 
	  res.json({
			"code":200,
		  "newPath":'888'
	   });
	  
});


  router.post('/uploader', upload.single('file'), function (req, res, next) {
   // console.log(req.file);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
	
	var extName = req.file.mimetype.substring(req.file.mimetype.indexOf('/')+1);  //后缀名
    switch (req.file.mimetype) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
	  case 'image/gif':
        extName = 'gif';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
	  case 'video/mp4':
		extName = 'mp4';
		break;
	case 'video/MP4':
		extName = 'MP4';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
	  res.json({
			"code":400,
		  "msg":"上传的文件不符合要求"
		});
      //res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
	var myDate = new Date();
	var date = myDate.getFullYear() + '-' + (myDate.getMonth()+1)+ '-' +  myDate.getDate();
	var dir = AVATAR_UPLOAD_FOLDER + date;
    //图片写入地址；
    var newPath =  dir +'/' + avatarName;
	console.log('dir='+dir);
    //显示地址；
    var showUrl = domain + newPath;
	var fastUrl = domain+'avatar/'+date+'/' +avatarName;
    console.log("newPath=",newPath,req.file.path);
    //重命名
	/*var readStream = fs.createReadStream(req.file.path)
    var writeStream = fs.createWriteStream(newPath);
     
    util.pump(readStream, writeStream, function() {
        fs.unlinkSync(req.file.path);
    });*/
	//fs.exists(dir, function(exists) {  
      //console.log(exists ? "创建成功" : "创建失败");  
	  //if(!exists){
		  fs.mkdir(dir, 0777, function(err){
			 if(err){
			  console.log(err);
			 }else{
			  console.log("creat done!");
			  
			 }
			})
	  //}
	//}); 
	fs.renameSync(req.file.path, newPath);  //重命名
	
    res.json({
		"code":200,
      "newPath":fastUrl,
	  "mimetype":extName
   });
	
	
  });
/* 图片上传路由 */
router.post('/uploaders', function(req, res) {
console.log('接收的请求对象=',req);
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    console.log('接收的文件对象=',files);

    var extName = '';  //后缀名
    switch (files.file.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
	  case 'video/mp4':
		extName = 'mp4';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
	  res.json({
			"code":400,
		  "msg":"上传的文件不符合要求"
		});
      //res.render('index', { title: TITLE });
      return;
    }
var myDate = new Date();  
    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    var showUrl = domain + AVATAR_UPLOAD_FOLDER + myDate.getFullYear() + myDate.getMonth()+ myDate.getDate() +'/' + avatarName;
    console.log("newPath=",newPath,files.file.path);
    fs.renameSync(files.file.path, newPath);  //重命名
    res.json({
		"code":200,
      "newPath":showUrl
   });
   });
});


/* 图片上传到七牛云路由 */
/*router.post('/uploaderToQiniu', function(req, res) {
	var data = req.body.content;
	var extName = "";
	var base64Data = "";
	if(data.indexOf('image/png')!=-1){
		extName = 'png';
//		base64Data = data.replace(/^data:image/png;base64,/,"");
	}else if(data.indexOf('image/jpeg')!=-1){
		extName = 'jpg';
//		base64Data = data.replace(/^data:image/jpeg;base64,/,"");
	}else if(data.indexOf('image/pjpeg')!=-1){
		extName = 'jpg';
//		base64Data = data.replace(/^data:image/pjpeg;base64,/,"");
	}
	base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    var avatarName = 'qiniu.' + extName;
    //图片写入地址；
    var newPath =  avatarName;
    //显示地址；
    console.log("newPath=",newPath);
    //fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    
    fs.writeFile(newPath, base64Data, 'base64', function(err) {
		if(err){
		  res.send(err);
		}else{
			console.log("base64保存图片成功！");
			qiniu.upLoadByFile(newPath,function(statusCode,respBody){
		    	res.json({
					   "code":200,
				       "respBody":respBody
				   });
		    });
		 
		}
	});
    
    
});*/


module.exports = router;
