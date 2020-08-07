/*
 * 朋友圈分享
 */
var express = require('express');
var dbHelper = require('./dbqs');
var http = require('http');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
	/*res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-requested-with");
    res.header('Access-Control-Allow-Headers', 'content-type');*/
  console.log('Time: ', (new Date()).Format('yyyy-MM-dd HH:mm:ss'));
  next();
});


/**查询热点**/
router.post('/queryAppHotspot',function(req, res, next){
	var usql="";
	if(req.body.otherid){
		//如果模块里面useid存在
		usql = ' and otherid="'+req.body.otherid+'"';
		
	}
	//phone自己的号码查自己的系统消息
	var selectsql = ' select * from surprise_modular where modular="'+req.body.modular+'" and phone="'+req.body.phone+'"' +usql;
						console.log("查询热点======",selectsql);
						dbHelper.list(selectsql, function (list, res) {
							
							res.send({code:200,msg:'查询成功',data:list});
							
						}, res);
	
	
});
/**添加或更新热点**/
router.post('/updateAppHotspot',function(req, res, next){
		var usql="";
		if(req.body.otherid){
			//如果模块里面useid存在
			usql = ' and otherid="'+req.body.otherid+'"';
			
		}
		var number = 1;
		if(req.body.number){
			number = req.body.number;
		}
		var selectsql = ' select * from surprise_modular where modular="'+req.body.modular+'" and phone="'+req.body.phone+'"' +usql;
							console.log("查询热点======",selectsql);
							dbHelper.list(selectsql, function (list, res) {
								
								if(list.length<1){
									//注意此处count为1，更新
									if(req.body.otherid){
										var sql = 'insert into surprise_modular(modular,number,update_time,phone,otherid) values( "'+req.body.modular+'",'+number+', "'+(new Date).Format('yyyy-MM-dd HH:mm:ss')+'","'+req.body.phone+'","'+req.body.otherid+'")';
										
															console.log("添加热点======",sql);
															dbHelper.list(sql, function (lists, res) {
																
																res.send({code:200,msg:'添加成功',data:lists});
																
															}, res);
										
									}else{
										var sql = 'insert into surprise_modular(modular,number,update_time,phone) values( "'+req.body.modular+'",'+number+', "'+(new Date).Format('yyyy-MM-dd HH:mm:ss')+'","'+req.body.phone+'")';
										
															console.log("添加热点======",sql);
															dbHelper.list(sql, function (lists, res) {
																
																res.send({code:200,msg:'添加成功',data:lists});
																
															}, res);
										
									}
										
									
								}else{
									
									if(req.body.otherid){
										var setsql = "";
										var item = list[0];
										//减少
										/*if(req.body.again){
										item.number-=req.body.again;
									}else
									item.number+=req.body.number;*/
									setsql = ' number ='+req.body.number;
										setsql+=' , update_time="'+(new Date).Format('yyyy-MM-dd HH:mm:ss')+'"';
										//res.send({code:201,msg:'已经存在无法更新'});
										var sqadd = 'update surprise_modular set '+setsql+' where modular="'+req.body.modular+'" and phone="'+req.body.phone+'" and otherid="'+req.body.otherid+'"';
											
											console.log("更新otherid热点数据======",sqadd);
											dbHelper.list(sqadd, function (list, res) {
												
												res.send({code:200,msg:'更新成功'});
												
											}, res);
									}else{
										
										var setsql = "";
									var item = list[0];
									
									//减少
									if(req.body.again){
										item.number-=req.body.again;
									}else
									item.number+=1;
									setsql = ' number ='+item.number;
									setsql+=' , update_time="'+(new Date).Format('yyyy-MM-dd HH:mm:ss')+'"';
									var sqadd = 'update surprise_modular set '+setsql+' where modular="'+req.body.modular+'" and phone="'+req.body.phone+'"';
											
											console.log("更新无otherid热点数据======",sqadd);
											dbHelper.list(sqadd, function (list, res) {
												
												res.send({code:200,msg:'更新成功'});
												
											}, res);
									}
									
									
								}
								
							}, res);
		
		
		
	
});


function getQueryString(name,s) {
			    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			    var r = s.match(reg);
			    //console.log(r);
			    if (r != null) {
			        //转码方式改成 decodeURI
			        return decodeURI(r[2]);
			    }
			    return null;
			}
var callback = function (data, res) {
   // res.render('list', {listData: data});
    // 第一个参数：模板名称对应list.ejs，第二个是参数名和数据

    console.log('success');
	res.send(data);
};
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


module.exports = router;