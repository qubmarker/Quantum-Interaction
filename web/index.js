var socket_io = require('socket.io');
const express = require('express');
const timeout = require('connect-timeout');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
var dbHelper = require('./dbqsChat');
//异常抛错处理模块
var domain = require('domain');
//上传图片
var upload = require('./upload');
//
var person = require('./person');
var socket_io = require('socket.io');
// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口
const { HOST = 'http://localhost:8087', PORT = '8086' } = process.env;
//const { HOST = 'http://139.199.15.148:8082', PORT = '8083' } = process.env;
// 超时时间
const TIME_OUT = 30 * 1e3;

// 设置端口
app.set('port', PORT);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({limit:'50mb'})
app.use(jsonParser);
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});
//domain来处理异常
app.use(function (req,res, next) {
  var d = domain.create();
  //监听domain的错误事件
  d.on('error', function (err) {
    console.log(err);
   // res.statusCode = 500;
   // res.json({sucess:false, messag: '服务器异常'});
   // d.dispose();
  });
  
  d.add(req);
  d.add(res);
  d.run(next);
});


var socket_Obj = {};//保存连接的socket
// 静态页面
// 这里一般设置你的静态资源路径
app.use('/', express.static('html'));
app.prepareSocketIO = function (server) {
	 var io = socket_io(server);
	 io.on('connection', function (socket) {
  
  socket.emit('confirm_connect', { hello: '您已经上线' });
  
  socket.on('login_event', function (data) {
		
		console.log(data);
		socket_Obj[data.id]=socket;
		socket.data_id = data.id;
		
		
		
  });
  socket.on('userInfo_event', function (data) {
		console.log(data);
		
		var sql = 'select username from user  where myid="'+data.myid +'"';
		dbHelper.list(sql, function (datas, res) {
			if(datas && datas.length>0)
			{
				socket.emit('userInfo_event', datas[0]);
			}else{
				socket.emit('userInfo_event', {error:'无此用户消息'});
			}
			
	  });
	  
		
		
  });
  
  //更新或者添加用户的信息
   socket.on('putUserInfo_event', function (datas) {
	   
		   var sql = 'select username from user  where myid="'+datas.myid +'"';
		dbHelper.list(sql, function (data, res) {
			if(data && data.length>0)
			{
				//res.send({code:200,msg:'查询成功',data:data[0]});
				//存在此用户就更新
				var sql_update = 'update user set username="' + datas.username + '" , nickname="' + datas.nickname +'",logindate="'+(new Date()).Format('yyyy-MM-dd HH:mm:ss')+'" ,headImg="'+ datas.headImg +'" where myid="'+datas.myid +'" '; 
				console.log('sql_update=',sql_update);
				dbHelper.list( sql_update
							, function (insert_data, insert_res) {
									
									socket.emit('putUserInfo_callback', { hello: '成功' });
							}, res);
			}else{
				//res.send({code:401,msg:'系统chaxun消息记录失败'});
				var insertSql = 'insert into user( myid, username, nickname, count,logindate ,headImg) values("'+datas.myid+'", "'+ datas.username +'" ,"'+datas.nickname+'",0,"'+ (new Date()).Format('yyyy-MM-dd HH:mm:ss') +'" , "'+ datas.headImg +'")';
				console.log('insertSql=',insertSql);
				dbHelper.list( insertSql
							, function (insert_data, insert_res) {
									socket.emit('putUserInfo_callback', { hello: '成功' });
									
							}, res);
			}
		});
  
    });
	
	
	socket.on('putGroupInfo_event',function(datas){
		var query_sql = 'select ids from group_user where group_id="'+datas.group_id+'"';
		console.log('查询请求ids数据',query_sql);
				dbHelper.list( query_sql
						, function (query_data, res) {
									if(query_data && query_data.length>0)
									 {
										 var item = query_data[0];
										 var list = item.ids.split(',');
										 var isExit = false;
										 for(var i = 0, m = list.length; i < m ;i++ ){
											 if(list[i]==datas.myid){
												
												isExit = true;
												break;
											 }
										 }
										if(!isExit){
											var update_sql=' update group_user set ids="'+ item.ids+','+ datas.myid +'"  where group_id="'+datas.group_id+'"';
											dbHelper.list( update_sql ,function(update_data, update_res){
												socket.emit('putGroupInfo_callback', { hello: '添加成功' });
												
											},res);
										}else{
											socket.emit('putGroupInfo_callback', { hello: '已经存在不用更新' });
											return;
										}
									 
									 }else{
										 var insert_sql=' insert into group_user( group_id, ids) values( "'+datas.group_id+'","'+datas.myid+'" ) ';
										 
										 dbHelper.list( insert_sql ,function(insert_data, insert_res){
												socket.emit('putGroupInfo_callback', { hello: '添加成功' });
												
											},res);
										 
										 
									 }
								
						});
		
	});
	
	
   socket.on('disconnect', function () { 
     console.log('下线');
		socket_Obj[socket.data_id] = null;
   });
})
}
app.post('/im/once',urlencodedParser, function(req, res) { 
  
		console.log('/once操作：',req.body,typeof req.body.myid);
		if(req.body.myid == undefined||req.body.otherid == undefined){
			res.send({code:402,msg:'请求参数为null'});
			return;
		}
		
		var sql = 'select sort_count,record from chat_msg  where myid="'+req.body.myid +'" and otherid="'+req.body.otherid+'"';
		console.log('------查询记录数据----');
		console.log('sql=',sql);
		//通过景点id查询
		var myDate = new Date();
		var date = myDate.Format('yyyy-MM-dd HH:mm:ss');//myDate.getFullYear() + (myDate.getMonth()+1)+ myDate.getDate();
		dbHelper.list(sql, function (data, res) {
			//存在就更新
			 if(data && data.length>0)
			 {
				 var item = data[0];
				 if(item.sort_count>0){
					item.sort_count++;
				}
				
				var currentMsg = ':&@&_:'+ date + ':@&@_:'+ req.body.msgType +':@&@_:' +req.body.data_msg;
				
				if(item.record){//如果记录存在
					if(item.record.length>5000){//超过数据库保存长度就删除
						item.record = '';
					}
					item.record = item.record+ currentMsg;//msgType消息类型
				}else{
					item.sort_count =1;
					item.record = currentMsg;
				}
				
				if(socket_Obj[req.body.otherid]){//发送到别人id
					socket_Obj[req.body.otherid].emit('Tomeonce',{data_msg:currentMsg});
				}
				if(socket_Obj[req.body.id]){//发送到自己id
					socket_Obj[req.body.id].emit('once',{data_msg:currentMsg});
				}
				
				 var update_sql = 'update chat_msg set sort_count = '+item.sort_count+',record="'+ item.record +'" where myid="' + req.body.myid + '" and otherid="'+ req.body.otherid+'"';
				dbHelper.list( update_sql
						, function (insert_data, insert_res) {
								res.send({code:200,msg:'更新成功'});
								return;
						}, res);
				
				
			//不存在就插入
			 }else{
				 var item = {};
				 item.sort_count =1;
				 item.record = ':&@&_:'+ date + ':@&@_:' + req.body.msgType +':@&@_:'+req.body.data_msg;
				 if(socket_Obj[req.body.otherid]){//发送到别人id
					socket_Obj[req.body.otherid].emit('Tomeonce',{data_msg:item.record});
				}
				if(socket_Obj[req.body.id]){//发送到自己id
					socket_Obj[req.body.id].emit('once',{data_msg:item.record});
				}
				 var insertSql = 'insert into chat_msg(myid,otherid,sort_count,record) values("'
                +req.body.myid+'","'+req.body.otherid+'",'
                        +item.sort_count+',"'+item.record+'")';
						dbHelper.list( insertSql
						, function (insert_data, insert_res) {
								res.send({code:200,msg:'插入成功'});
								return;
						}, res);

				 
			 }
			
			
				//res.send(data);
		}, res);
//res.send({code:401,msg:'系统记录消息记录失败'});
		
	});
	
	
/**
*把用户消息记录到消息系统中
**/
 app.post('/im/putUserInfo',urlencodedParser, function(req, res) { 
 console.log('把用户消息记录到消息系统中',req.query,req.body);
	var sql = 'select username from user  where myid="'+req.body.myid +'"';
	dbHelper.list(sql, function (data, res) {
		if(data && data.length>0)
		{
			//res.send({code:200,msg:'查询成功',data:data[0]});
			//存在此用户就更新
			var sql_update = 'update user set  username="' + req.body.username + '" , nickname="' + req.body.nickname +'",logindate="'+(new Date()).Format('yyyy-MM-dd HH:mm:ss')+'",headImg="'+ req.body.headImg+'" where myid="'+req.body.myid +'"'; 
			console.log('sql_update=',sql_update);
			dbHelper.list( sql_update
						, function (insert_data, insert_res) {
								
								res.send({code:200,msg:'更新成功'});
						}, res);
		}else{
			//res.send({code:401,msg:'系统chaxun消息记录失败'});
			var insertSql = 'insert into user( myid, username, nickname,count, logindate ,headImg) values("'+req.body.myid+'", "'+ req.body.username +'" ,"'+req.body.nickname+'",0,"'+ (new Date()).Format('yyyy-MM-dd HH:mm:ss') +'","' + req.body.headImg + '" )';
			console.log('insertSql=',insertSql);
			dbHelper.list( insertSql
						, function (insert_data, insert_res) {
								
								res.send({code:200,msg:'插入成功'});
						}, res);
		}
	},res);
	//res.send({code:401,msg:'用户信息插入或者更新失败'});
 });

 
 /**
 *获取用户信息是自己也可以是别人
 **/
app.post('/im/getUserInfo',urlencodedParser, function(req, res) { 
	var sql = 'select username,headImg,nickname from user  where myid="'+req.body.myid +'"';
	console.log('获取此'+req.body.myid +'用户信息=',sql);
	dbHelper.list(sql, function (data, res) {
		if(data && data.length>0)
		{
			res.send({code:200,msg:'发送的用户信息',data:data[0]});
		}else{
			res.send({code:401,msg:'无此用户消息'});
		}
		
	  }, res);
	  
	  
 });	
	

/**
*查询历史记录
**/
 app.post('/im/queryHistory',urlencodedParser, function(req, res) { 
	var sql = 'select sort_count,record from chat_msg  where myid="'+req.body.myid +'" and otherid="'+req.body.otherid+'"';
	console.log('查询历史记录sql=',sql);
	dbHelper.list(sql, function (data, res) {
		if(data && data.length>0)
		{
			console.log('data=',data);
			res.send({code:200,msg:'查询历史记录',data:data[0]});

		}else{
			res.send({code:401,msg:'系统查询消息记录失败'});
		}
	}, res);
 });
  
/**
*查询Group组历史记录
**/
 app.post('/im/queryGroupHistory',urlencodedParser, function(req, res) { 
 
	var sql = 'select sort_count,record ,last_word, last_time, last_type,myid from group_chat  where group_id="'+req.body.group_id+'"';
	console.log('查询Group组历史记录sql=',sql);
	dbHelper.list(sql, function (data, res) {
		if(data && data.length>0)
		{
			console.log('data=',data);
			for(var i=0,m=data.length;i<m;i++){
				data[i].last_time = data[i].last_time.Format('yyyy-MM-dd HH:mm:ss');
			}
			
			res.send({code:200,msg:'查询历史记录',data:data});

		}else{
			res.send({code:401,msg:'系统查询消息记录失败'});
		}
	}, res);
 }); 
 
 /**
*转移代理商后重新更新group_id
**/
 app.post('/im/updateChatByNewOrderId',urlencodedParser, function(req, res) { 
 
 if(req.body.new_id==null||req.body.new_id==""||req.body.new_id==undefined){
	 res.send({code:203,msg:'请传正确的new_id参数'});
 }
 
	var update_user = 'update group_user set group_id = "'+req.body.new_id+'" where id='+req.body.group_id;
	dbHelper.list( update_user
						, function (user_data, user_res) {
	
	
	var sql = 'select id from group_chat where group_id="'+req.body.group_id+'"';
	
	console.log('查询需要修改的group,sql=',sql);
	dbHelper.list(sql, function (data, res) {
		if(data && data.length>0)
		{
			
			
			//for(var i=0,m=data.length ; i < m ; i++  ){
				
			//}
			updateChatByMewId();
			function updateChatByMewId(){
				var item = data.shift();
			var update_sql = 'update group_chat set group_id = "'+req.body.new_id+'" where id='+item.id;
				dbHelper.list( update_sql
						, function (insert_data, insert_res) {
							if(data.length<1){
								res.send({code:200,msg:'更新group_id成功'});
							}else{
								updateChatByMewId();
							}
								return;
						}, res);
						
			}
			

		}else{
			res.send({code:401,msg:'更新group_id失败'});
		}
	}, res);
	
	}, res);
 }); 
 
 
 /**
*查询用户所在的群组
**/
 app.post('/im/queryGroupIdbymyid',urlencodedParser, function(req, res) { 
	
	
	var sql = '';
	
	if(req.body.type){
		sql = ' and type='+req.body.type;
	}
	
	
	 var query_sql = 'select ids,group_id,group_name,type from group_user where ids like "%'+req.body.myid+'%"' + sql;
		dbHelper.list(query_sql, function (data, res) {
						if(data && data.length>0)
						{
							//console.log('data=',data);
							
							res.send({code:200,msg:'查询用户Groupid信息',data:data});

						}else{
							res.send({code:401,msg:'查询用户Groupid信信息失败'});
						}
				}, res);
 
 });
 
 
/**
*惊喜聊首页数据渲染
**/
 app.post('/im/queryGroupInJIngxiliaoFirst',urlencodedParser, function(req, res) { 
	
	
	var sql = '';
	
	if(req.body.type){
		sql = ' and type='+req.body.type;
	}
	
	
	 var query_sql = 'select ids,group_id,group_name,type from group_user where ids like "%'+req.body.myid+'%"' + sql;
	// console.log('惊喜聊首页数据渲染query_sql=',req);
		dbHelper.list(query_sql, function (data, res) {
						if(data && data.length>0)
						{
							//console.log('data=',data);
							var ids_sql='';
							var qucong=[];//去重复数组
							for( var i=0,m=data.length;i<m;i++ ){
								var ids = data[i].ids.split(",");
								//console.log("ids=",ids);
								for(var k=0 ,n = ids.length;k<n;k++){
									
									if(qucong.indexOf(ids[k])==-1){
										console.log("qucong=",ids[k]);
										qucong.push(ids[k]);
										if(i==0&&k==0){
										
										ids_sql+=' where 1=1  and ( '+'  myid="'+ids[k]+'"';
										}
										/*else if(i==m-1&&k==n-1){
											ids_sql+='  or myid="'+ids[k];
										}*/
										else{
											ids_sql+='  or myid="'+ids[k]+'"';
										}
										
										
									}
									
									
									
								}
								
							}
							
							if(ids_sql.length>0){
								ids_sql+=')'
							}
							
							var person_sql = ' select * from user '+ ids_sql;
							console.log("查询群众组里面的个人信息",person_sql);
							dbHelper.list(person_sql, function (datas, res) {
									if(datas && datas.length>0)
									{
										//console.log('data=',data);
										
										res.send({code:200,msg:'查询用户Groupid用户信息',persons:datas,groups:data});

									}else{
										res.send({code:401,msg:'查询用户Groupid用户失败'});
									}
								}, res);
							
							
							

						}else{
							res.send({code:401,msg:'查询用户Groupid信信息失败'});
						}
				}, res);
 
 });
 
 
/**
*查询Group组用户信息
**/
 app.post('/im/queryGroupUserInfo',urlencodedParser, function(req, res) { 
 var query_sql = 'select ids from group_user where group_id="'+req.body.group_id+'"';
 console.log('开始查询ids',query_sql);
 dbHelper.list(query_sql, function (datas, ress) {
		if(datas && datas.length>0)
		{
			var list = datas[0].ids.split(',');
			console.log('---查询用户组信息---');
				if(list&&list.length>0){
					
					var w = 'myid="'+list[0]+'"';
					
					for( var i = 1, m = list.length ; i < m ; i++ ){
						w = w+ 'or myid="'+list[i]+'"';
					}
					
					var sql = 'select headImg,username,myid FROM user WHERE '+w;
					dbHelper.list(sql, function (data, res) {
						if(data && data.length>0)
						{
							console.log('data=',data);
							
							res.send({code:200,msg:'查询Group组用户信息',data:data});

						}else{
							res.send({code:401,msg:'查询Group组用户信息失败'});
						}
				}, res);
					
				}
				
		}else{
			res.send({code:401,msg:'系统查询ids失败'});
		}
	}, res);
 
 
	
	
	
	
  });
 /**
*查询Group组历史记录最新一条消息
**/
 app.post('/im/queryGroupLastNews',urlencodedParser, function(req, res) { 
	var sql = 'select sort_count,record ,last_word, last_time, last_type from group_chat  where group_id="'+req.body.group_id+'"';
	console.log('查询Group组历史记录sql=',sql);
	dbHelper.list(sql, function (data, res) {
		if(data && data.length>0)
		{
			console.log('data=',data);
			var  record ="",sort_count=0;// data.data.record;
					
					for( var i=0,m=data.length; i<m ;i++ ){
						if(!data[i].record||data[i].record==""){
							sort_count = data[i].sort_count-1;
						}else
						sort_count = data[i].sort_count;
						record += data[i].record+":&@&_:"+data[i].last_time.Format('yyyy-MM-dd HH:mm:ss')+":@&@_:"+data[i].last_type+":@&@_:"+data[i].last_word;
						
					}
					
					 var list = record.split(':&@&_:');
					 console.log(list);
					 var msgList = [];
					  for( var i=0,m= list.length; i< m;i++ ){
						if(list[i].length<2)continue;
						var srr = list[i].split(':@&@_:');
						msgList.push( {'total':sort_count, 'content':srr[2], 'type':0, 'time':srr[0],'msgType':srr[1] , 't':convertDateFromString(srr[0]).getTime()} );//type=0表示自己对别人的聊天，1表示别人对自己的聊天
					 }
					 msgList = msgList.sort(compare("t"));
			//由于weex解析json会有循环打印问题改为dataMsg
			res.send({code:200,msg:'查询最新一条记录',dataMsg:msgList[msgList.length-1]});
			//res.send([msgList[msgList.length-1]]);
		}else{
			res.send({code:401,msg:'查询最新一条记录失败'});
		}
	}, res);
 });
/**
*把用户消息记录到组中
**/
 app.post('/im/putGroup',urlencodedParser, function(req, res) { 
	if(req.body.myid == undefined||req.body.group_id == undefined||req.body.type == undefined){
			res.send({code:402,msg:'请求参数为null'});
			return;
		}
	var query_sql = 'select ids from group_user where group_id="'+req.body.group_id+'"';
	console.log('查询请求ids数据',query_sql);
				dbHelper.list( query_sql
						, function (query_data, query_res) {
									if(query_data && query_data.length>0)
									 {
										 var item = query_data[0];
										 var list = item.ids.split(',');
										 var isExit = false;
										 for(var i = 0, m = list.length; i < m ;i++ ){
											 if(list[i]==req.body.myid){
												
												isExit = true;
												break;
											 }
										 }
										if(!isExit){
											var update_sql=' update group_user set ids="'+ item.ids+','+ req.body.myid +'"  where group_id="'+req.body.group_id+'"';
											dbHelper.list( update_sql ,function(update_data, update_res){
												res.send({code:200,msg:'更新成功'});
												
											},res);
										}else{
											res.send({code:200,msg:'已经存在不用更新'});
											return;
										}
									 
									 }else{
										 var insert_sql=' insert into group_user( group_id, ids,type ,group_name) values( "'+req.body.group_id+'","'+req.body.myid+'" ,'+req.body.type+',"'+req.body.group_name+'")';
										 
										 dbHelper.list( insert_sql ,function(insert_data, insert_res){
												res.send({code:200,msg:'添加成功'});
												
											},res);
										 
										 
									 }
								
						}, res);
	
	
	 });
	 
	 
	 /**
*修改群名字
**/
 app.post('/im/updateGroup',urlencodedParser, function(req, res) { 
	if(req.body.group_id == undefined||req.body.group_name == undefined){
			res.send({code:402,msg:'请求参数为null'});
			return;
		}
	
									
										
									
		var update_sql=' update group_user set group_name="'+ req.body.group_name +'"  where group_id="'+req.body.group_id+'"';
		dbHelper.list( update_sql ,function(update_data, update_res){
			res.send({code:200,msg:'更新成功'});
			
		},res);
										
									
								
					
	
	
	 });
  /**
  *把用户消息从组中删除
  **/
   app.post('/im/deleteGroup',urlencodedParser, function(req, res) { 
  	if(req.body.myid == undefined||req.body.group_id == undefined){
  			res.send({code:402,msg:'请求参数为null'});
  			return;
  		}
  	var query_sql = 'select ids from group_user where group_id="'+req.body.group_id+'"';
  	console.log('查询请求ids数据',query_sql);
  				dbHelper.list( query_sql
  						, function (query_data, query_res) {
  									if(query_data && query_data.length>0)
  									 {
  										 var item = query_data[0];
  										 var list = item.ids.split(',');
  										 var isExit = false;
										 var newids="";
  										 for(var i = 0, m = list.length; i < m ;i++ ){
  											 if(list[i]==req.body.myid){
  												
  												isExit = true;
  												
  											 }else{
												 if(i==0)
													newids += list[i];
												 else
												  newids += ','+list[i];
											 }
  										 }
  										if(isExit){
  											var update_sql=' update group_user set ids="'+ newids +'"  where group_id="'+req.body.group_id+'"';
  												console.log('更新ids数据===',update_sql);
											dbHelper.list( update_sql ,function(update_data, update_res){
  												res.send({code:200,msg:'更新成功'});
  												
  											},res);
  										}else{
  											res.send({code:200,msg:'此群压根没你'});
  											return;
  										}
  									 
  									 }else{
  										 res.send({code:200,msg:'没这个群'});
  										 
  										 
  									 }
  								
  						}, res);
  	
  	
  	 });
/***
*--------------------------------------------群聊------------------------------------------
**/
 app.post('/im/sendMessage',urlencodedParser, function(req, res) { 
	console.log('/sendMessage操作：',req.query,req.body,typeof req.body.myid);
		if(req.body.myid == undefined||req.body.group_id == undefined){
			res.send({code:402,msg:'请求参数为null'});
			return;
		}
		var query_sql = 'select ids from group_user where group_id="'+req.body.group_id+'"';
		var sql = 'select sort_count , record , last_word , last_time , last_type from group_chat  where myid="'+req.body.myid +'" and group_id="'+req.body.group_id+'"';
		console.log('------查询记录数据----');
		console.log('sql=',sql);
		//通过景点id查询
		var myDate = new Date();
		var date = myDate.Format('yyyy-MM-dd HH:mm:ss');//myDate.getFullYear() + (myDate.getMonth()+1)+ myDate.getDate();
		dbHelper.list(sql, function (data, res) {
			//存在就更新
			 if(data && data.length>0)
			 {
				 var item = data[0];
				 if(item.sort_count>0){
					item.sort_count++;
				}
				
				var currentMsg = ':&@&_:'+ date + ':@&@_:'+ req.body.msgType +':@&@_:' +req.body.data_msg+':@&@_:' +req.body.appType;
				var last_word = ':&@&_:'+ item.last_time.Format('yyyy-MM-dd HH:mm:ss') + ':@&@_:'+ item.last_type +':@&@_:' + item.last_word+':@&@_:' +item.last_appType;//把先前得最后一句话存放到item_word里面
				//console.log(item.last_time.Format('yyyy-MM-dd HH:mm:ss') ,'item.last_time=',typeof item.last_time );
				if(item.record){//如果记录存在
					if(item.record.length>15000){//超过数据库保存长度就删除
						item.record = '';
					}
					item.record = item.record+ last_word//currentMsg;//msgType消息类型
				}else{
					item.sort_count =1;
					item.record = last_word//currentMsg;
				}
				
				
				console.log('查询请求ids数据',query_sql);
				dbHelper.list( query_sql
						, function (query_data, query_res) {
									if(query_data && query_data.length>0)
									 {
										  var item = query_data[0];
										  var list = item.ids.split(',');
										 for(var i = 0, m = list.length; i < m ;i++ ){
											if( socket_Obj[list[i]] && list[i] != req.body.myid ){//发送到别人id
													socket_Obj[list[i]].emit('Tomeonce',{data_msg:currentMsg,id:req.body.myid});
												}
											 
										 }
										
									 
									 }
								
						}, res);
				
				
				
				if(socket_Obj[req.body.myid]){//发送到自己id
					socket_Obj[req.body.myid].emit('once',{data_msg:currentMsg});
				}
				
				 var update_sql = 'update group_chat set sort_count = '+item.sort_count+',record="'+ item.record +'" ,last_word="'+req.body.data_msg+'",last_time="'+date+'",last_type='+req.body.msgType+',last_appType='+ req.body.appType+' where myid="' + req.body.myid + '" and group_id="'+ req.body.group_id+'"';
				console.log('发送请求update_sql=',update_sql);
				dbHelper.list( update_sql
						, function (insert_data, insert_res) {
								res.send({code:200,msg:'更新成功'});
								return;
						}, res);
				
				
			//不存在就插入
			 }else{
				 var item = {};
				 item.sort_count =1;
				 item.record = ""
				 var currentMsg = ':&@&_:'+ date + ':@&@_:' + req.body.msgType +':@&@_:'+req.body.data_msg+':@&@_:' +req.body.appType;
				 console.log('查询请求ids数据',query_sql);
				dbHelper.list( query_sql
						, function (query_data, query_res) {
									if(query_data && query_data.length>0)
									 {
										  var item = query_data[0];
										  var list = item.ids.split(',');
										 for(var i = 0, m = list.length; i < m ;i++ ){
											if(socket_Obj[list[i]]&& list[i] != req.body.myid){//发送到别人id
													socket_Obj[list[i]].emit('Tomeonce',{data_msg:currentMsg,id:req.body.myid});
												}
											 
										 }
										
									 
									 }
								
						}, res);
				if(socket_Obj[req.body.myid]){//发送到自己id
					socket_Obj[req.body.myid].emit('once',{data_msg:currentMsg});
				}
				
				var _sql = 'select sort_count , record , last_word , last_time , last_type from group_chat  where group_id="'+req.body.group_id+'"';
				console.log('查询是不是第一个发送会话的', _sql);
				dbHelper.list( _sql, function (_data, _res) {
					
					 var insertSql = 'insert into group_chat(myid,group_id,sort_count,record,last_word,last_time,last_type,last_appType) values("'
                +req.body.myid+'","'+req.body.group_id+'",'
                        +item.sort_count+',"'+item.record+'","'+req.body.data_msg+'","'+date+'","'+req.body.msgType+'",'+req.body.appType+')';
						dbHelper.list( insertSql
						, function (insert_data, insert_res) {
							
								console.log('查询是不是第一个发送会话的=', _data);
							if( _data && _data.length > 0 )
								res.send({code:200,msg:'插入成功',data:{isFirst:"false"}});
							else
								res.send({code:200,msg:'插入成功',data:{isFirst:"true"}});
								return;
						}, res);

					
					
					
					}, res);
				
				
				 
			 }
			
			
				//res.send(data);
		}, res);
 });
  
  //------------------------------------------主动触发socket事件,发送到week或浏览器的事件------------------------------------------------------
   app.post('/im/sendWeexEventById',urlencodedParser, function(req, res) { 
		if(null == req.body.id || undefined == req.body.id || "" == req.body.id){
			res.send({code:203,msg:'请传正确的id值'});
			
		}
		if(null == req.body.eventName || undefined == req.body.eventName || "" == req.body.eventName){
			res.send({code:203,msg:'请传正确的事件eventName值'});
			
		}
		
		if(null == req.body.data || undefined == req.body.data || Object != typeof req.body.data){
			res.send({code:203,msg:'请传正确的事件data值'});
			
		}
		
		socket_Obj[req.body.id].emit('aTob_callback', { eventName: req.body.eventName,data: req.body.data});
  
  });
  
  
     app.post('/im/sendWeexEventAll', function(req, res) { 
		
		if(null == req.body.eventName || undefined == req.body.eventName || "" == req.body.eventName){
			res.send({code:203,msg:'请传正确的事件eventName值'});
			
		}
		
		if(null == req.body.data || undefined == req.body.data || Object != typeof req.body.data){
			res.send({code:203,msg:'请传正确的事件data值'});
			
		}
		
		for( var key in socket_Obj ){
			socket_Obj[key].emit('aTob_callback', { eventName: req.body.eventName,data: req.body.data});
			
		}
		
		
  
  });
// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api
console.log('HOST='+HOST);

app.use('/whios', function(req, res, next) {

    //
    	
   console.log(req.url);
   if(req.url.indexOf("test")!=-1){
	   req.path=req.url = "/mgr/register";
	   var account = (new Date).Format('MMddHHmmss')+Math.floor(Math.random()*100)
	   req.body.account=account;
	   req.body.password="145790";
   }
   console.log(req.params,req.path,req.url,req.query,req.body);
   
   next();
});
app.use(createProxyMiddleware('/whios', { 
        target: HOST 
       , changeOrigin: true
	,pathRewrite: {
				  '^/whios': '/mgr/register'
				}
}));
app.use(createProxyMiddleware('/hioser', { 
        target: HOST 
       , changeOrigin: true
	,pathRewrite: {
				  '^/hioser': '/loginUser'
				}
}));
app.use(createProxyMiddleware('/api', { 
        target: HOST 
       , changeOrigin: true
	,pathRewrite: {
				  '^/api': ''
				}
}));
/*app.use(proxy('/im', { 
        target: 'http://139.199.15.148:8084' 
       , changeOrigin: true
	,pathRewrite: {
				  '^/im': ''
				}
}));*/
//console.log(upload);
app.use('/upload',upload);
app.use('/person',person);

app.get('/downApp', function(req,res){
	console.log("==进入首页==");
	res.sendfile("html/download/download.html");
});
app.get('/', function(req,res){
	console.log("==进入首页==");
	//res.sendfile("pages/login.html");
	res.sendfile("html/pc.html");
});
app.get('/index', function(req,res){
	console.log("==进入首页==");
	res.sendfile("html/pc.html");
});
// 监听端口
/*app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});*/
// 监听端口
var server = app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
  try {
  	app.prepareSocketIO(server);
    } catch(e) {
      console.log('\r\n', e, '\r\n', e.stack);
     
    }
});

//对数组中的对象属性按从小到大排列
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}
// 字符串转日期
function convertDateFromString(dateString) { 
if (dateString) { 
var arr1 = dateString.split(" "); 
var sdate = arr1[0].split('-'); 
var stime = arr1[1].split(':'); 
var date = new Date(sdate[0], sdate[1]-1, sdate[2],stime[0],stime[1],stime[2]); 
return date;
} 
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
        "H+" : this.getHours(), //小时     
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

