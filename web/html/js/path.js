var JS_PATH="/api";//本项目所有ajax，域名配置
var JS_PATH_IMG="";//本项目所有ajax，域名配置
/**
 * 调用muiajax方法
 * @param {Object} url 请求的路径
 * @param {Object} obj 请求参数，函数
 * @param {Object} isLoading 是否启用遮罩动画效果
 */
var humanAjax = function(url,obj,header,isLoading,content,isNptips){
	var enIndex  = -1;
	if(isLoading){
		//loading效果
				enIndex = layer.open({
							    type: 2
							    ,content: content||'登录中...'
							  });
	}
	if(header){
		mui.ajax(url,{
							data:obj.data,
							//crossDomain :obj.crossDomain,
							dataType:obj.dataType,//服务器返回json格式数据
							type:obj.type,//HTTP请求类型
		//					async:obj.async||false,
							//processData:true,
							headers:{'Authorization':header},	
							success:function(data){
								if(isLoading){
									layer.close(enIndex);
								}
								if(data.code == 332){
									
									/* if(obj.isNoToloagin){//判断是否自动跳转到登录页面，默认跳转
										obj.success(data);
									}else{
										var webview = mui.openWindow('../../login/login.html');
										if(obj.webviewBackHandler&& typeof obj.webviewBackHandler == 'function'){
											webview.addEventListener('loaded', function(e){
			//									alert('Webview Hided');
											}, false);
											webview.addEventListener('close', function(e){
		//										alert('Webview close');
												obj.webviewBackHandler(data);
											}, false );
										}
										
									}
									 */
									
								}else if(data.code == 400){
									if(!isNptips)
									mui.toast(data.msg);
								}else
									obj.success(data);
								
							},error:function(e){
								if(isLoading){
									layer.close(enIndex);
								}
									obj.error(e);
							}
						});
	}else{
		mui.ajax(url,{
							data:obj.data,
							//crossDomain :obj.crossDomain,
							dataType:obj.dataType,//服务器返回json格式数据
							type:obj.type,//HTTP请求类型
		//					async:obj.async||false,
							//processData:true,
							//headers:{'Content-Type':'application/x-www-form-urlencoded'},	
							success:function(data){
								if(isLoading){
									layer.close(enIndex);
								}
								if(data.code == 332){
									
									if(obj.isNoToloagin){//判断是否自动跳转到登录页面，默认跳转
										obj.success(data);
									}else{
										/* var webview = mui.openWindow('login.html');
										if(obj.webviewBackHandler&& typeof obj.webviewBackHandler == 'function'){
											webview.addEventListener('loaded', function(e){
			//									alert('Webview Hided');
											}, false);
											webview.addEventListener('close', function(e){
		//										alert('Webview close');
												obj.webviewBackHandler(data);
											}, false );
										}
										 */
									}
									
									
								}else if(data.code == 400){
									if(!isNptips)
									mui.toast(data.msg);
								}else
									obj.success(data);
								
							},error:function(e){
								if(isLoading){
									layer.close(enIndex);
								}
									obj.error(e);
							}
						});
	}
	
}
/**
 * 调用jquery ajax
 * **/
var $humanAjax = function(url,obj,header,isLoading,content,isNptips){
	var enIndex  = -1;
	if(isLoading){
		//loading效果
				enIndex = layer.open({
							    type: 2
							    ,content: content||'登录中...'
							  });
	}
	if(header){
		$.ajax({url,
							data:obj.data,
							//crossDomain :obj.crossDomain,
							dataType:obj.dataType,//服务器返回json格式数据
							type:obj.type,//HTTP请求类型
		//					async:obj.async||false,
							//processData:true,
							headers:{'Authorization':header},	
							success:function(data){
								if(isLoading){
									layer.close(enIndex);
								}
								if(data.code == 332){
									
									if(obj.isNoToloagin){//判断是否自动跳转到登录页面，默认跳转
										obj.success(data);
									}else{
										/* var webview = mui.openWindow('login.html');
										if(obj.webviewBackHandler&& typeof obj.webviewBackHandler == 'function'){
											webview.addEventListener('loaded', function(e){
			//									alert('Webview Hided');
											}, false);
											webview.addEventListener('close', function(e){
		//										alert('Webview close');
												obj.webviewBackHandler(data);
											}, false );
										} */
										
									}
									
									
								}else if(data.code == 400){
									if(!isNptips)
									mui.toast(data.msg);
								}else
									obj.success(data);
								
							},error:function(e){
								if(isLoading){
									layer.close(enIndex);
								}
									obj.error(e);
							}
						});
	}else{
		$.ajax({url,
							data:obj.data,
							//crossDomain :obj.crossDomain,
							dataType:obj.dataType,//服务器返回json格式数据
							type:obj.type,//HTTP请求类型
		//					async:obj.async||false,
							//processData:true,
							//headers:{'Content-Type':'application/x-www-form-urlencoded'},	
							success:function(data){
								if(isLoading){
									layer.close(enIndex);
								}
								if(data.code == 332){
									
									if(obj.isNoToloagin){//判断是否自动跳转到登录页面，默认跳转
										obj.success(data);
									}else{
										/* var webview = mui.openWindow('login.html');
										if(obj.webviewBackHandler&& typeof obj.webviewBackHandler == 'function'){
											webview.addEventListener('loaded', function(e){
			//									alert('Webview Hided');
											}, false);
											webview.addEventListener('close', function(e){
		//										alert('Webview close');
												obj.webviewBackHandler(data);
											}, false );
										} */
										
									}
									
									
								}else if(data.code == 400){
									if(!isNptips)
									mui.toast(data.msg);
								}else
									obj.success(data);
								
							},error:function(e){
								if(isLoading){
									layer.close(enIndex);
								}
									obj.error(e);
							}
						});
	}
	
}
/*调用ajax
* @param {Object} url 请求的路径
 * @param {Object} obj 请求参数，函数
 * @param {Object} isLoading 是否启用遮罩动画效果
 */
var $Ajax = function(url,obj,isLoading,content){
	var enIndex  = -1;
	if(isLoading){
		//loading效果
				enIndex = layer.open({
							    type: 2
							    ,content: content||'登录中...'
							  });
	}
	
	$.ajax({
					url:url,
					data:obj.data,
					crossDomain :obj.crossDomain,
					dataType:obj.dataType,//服务器返回json格式数据
					type:obj.type,//HTTP请求类型
						/**
	             * 必须false才会避开jQuery对 formdata 的默认处理
	             * XMLHttpRequest会对 formdata 进行正确的处理
	             */
	            processData: false,
	            /**
	             *必须false才会自动加上正确的Content-Type
	             */
	            contentType: false,
					success:function(data){
						if(isLoading){
							layer.close(enIndex);
						}
						if(data.code == 332){
							mui.openWindow('login.html');
						}else if(data.code == 400){
							mui.toast(data.msg);
						}else
							obj.success(data);
						
					},error:function(e){
						if(isLoading){
							layer.close(enIndex);
						}
							obj.error(e);
					}
				});
}


/***
*原生
**/
var $humanAjaxFunc = function (url,obj,header,isLoading,content,isNptips){
	//alert(1)
//function xhrAjax(type, url, data, success, failed){  
if(localStorage.isapp=="true"){
	$humanAjaxAPP(url,obj,header,isLoading,content,isNptips);
	return;
}
	 var enIndex  = -1;
	if(isLoading){
		//loading效果
				enIndex = layer.open({
							    type: 2
							    ,content: content||'登录中...'
							  });
	}
	var type = obj.type;
	var data = obj.data;
	
    // 创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 
    var type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();
 
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
 
    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();
 
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if(header){
			xhr.setRequestHeader('Authorization',header);
		}
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
           /*  if(xhr.status == 200){
                //success(xhr.responseText);
				
            } else {
                if(failed){
                    failed(xhr.status);
                }
            } */
				if(isLoading){
					layer.close(enIndex);
				}
				if(xhr.status == 332){
					mui.openWindow('login.html');
				}else if(xhr.status == 400){
					//mui.toast(xhr.responseText);
				}else{
					
				}
				//console.log(xhr.status)
					try{
						obj.success(JSON.parse(xhr.responseText));
					}catch(e){
						//TODO handle the exception
						obj.success(xhr.responseText);
					}
					
        }
    }
}
/***
*原生
**/
function $humanAjaxAPP(url,obj,header,isLoading,content,isNptips){
	
	//alert(1)
	//function xhrAjax(type, url, data, success, failed){  
		 var enIndex  = -1;
		if(isLoading){
			//loading效果
					enIndex = layer.open({
								    type: 2
								    ,content: content||'登录中...'
								  });
		}
		var type = obj.type;
		var data = obj.data;
		
	    // 创建ajax对象
	    var xhr = null;
	   
	        xhr = new plus.net.XMLHttpRequest();
	  
	 
	    var type = type.toUpperCase();
	    // 用于清除缓存
	    var random = Math.random();
	 
	    if(typeof data == 'object'){
	        var str = '';
	        for(var key in data){
	            str += key+'='+data[key]+'&';
	        }
	        data = str.replace(/&$/, '');
	    }
	 
	    if(type == 'GET'){
	        if(data){
	            xhr.open('GET', url + '?' + data, true);
	        } else {
	            xhr.open('GET', url + '?t=' + random, true);
	        }
	        xhr.send();
	 
	    } else if(type == 'POST'){
	        xhr.open('POST', url, true);
	        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
	        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			if(header){
				xhr.setRequestHeader('Authorization',header);
			}
	        xhr.send(data);
	    }
	 
	    // 处理返回数据
	    xhr.onreadystatechange = function(){
	        if(xhr.readyState == 4){
	           /*  if(xhr.status == 200){
	                //success(xhr.responseText);
					
	            } else {
	                if(failed){
	                    failed(xhr.status);
	                }
	            } */
					if(isLoading){
						layer.close(enIndex);
					}
					if(xhr.status == 332){
						mui.openWindow('login.html');
					}else if(xhr.status == 400){
						//mui.toast(xhr.responseText);
					}else{
						
					}
					//console.log(xhr.status)
						obj.success(JSON.parse(xhr.responseText));
	        }
	    }
	
}
/* ————————————————
版权声明：本文为CSDN博主「烤鸭的世界我们不懂」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Angry_Mills/article/details/85170475 */


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

function getQueryString(name) {
			    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			    var r = window.location.search.substr(1).match(reg);
			    //console.log(r);
			    if (r != null) {
			        //转码方式改成 decodeURI
					console.log(r[2],decodeURI(r[2]))
			        return decodeURI(r[2]);
			    }
			    return null;
			}
			
			
			
			
			
			// 图片预览
			function previewImage(url){
				if(window.plus)
				plus.nativeUI.previewImage(url);
			}

(function($) {
      $.fn.extend({
          insertAtCaret: function(myValue) {
              var $t = $(this)[0];
			  
                //IE
             if (document.selection) {
				  this.focus();
                  sel = document.selection.createRange();
                  sel.text = myValue;
                  this.focus();
             } else//!IE
             if ($t.selectionStart || $t.selectionStart == "0") {
				 console.log("-----2");
                 var startPos = $t.selectionStart;
                 var endPos = $t.selectionEnd;
                 var scrollTop = $t.scrollTop;
                 $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                 this.focus();
                 $t.selectionStart = startPos + myValue.length;
                 $t.selectionEnd = startPos + myValue.length;
                 $t.scrollTop = scrollTop;
             } else {
				 console.log("-----1");
                 this.value += myValue;
                 this.focus();
             }
         }
     })
 })(jQuery);
 
 
 
 
 /**查询热点**/
 function queryAppHotspot(param,calllback){
 	$humanAjaxFunc('/person/queryAppHotspot',{
 					data:param,
 					crossDomain :true,
 					dataType:'json',//服务器返回json格式数据
 					type:'post',//HTTP请求类型
 					success:function(data){
 					
 						//获得服务器响应
 						console.log(data);
 						if(data&&data.data){
 							if(typeof calllback == "function")
 							calllback(data)
 						}
 						
 	
 					},error:function(e){
 						
 						console.log(e.responseJSON);
 					
 						
 					}
 				}
 				,localStorage.getItem("token")||"11111111111111111111"
 				);
 }
 
 /**更新热点**/
 function updateAppHotspot(param,calllback){
 	$humanAjax('/person/updateAppHotspot',{
 					data:param,
 					crossDomain :true,
 					dataType:'json',//服务器返回json格式数据
 					type:'post',//HTTP请求类型
 					success:function(data){
 					
 						//获得服务器响应
 						console.log(data);
 						if(data&&data.code==200){
 							if(typeof calllback == "function")
 							calllback(data)
 						}
 						
 	
 					},error:function(e){
 						
 						console.log(e.responseJSON);
 					
 						
 					}
 				}
 				,localStorage.getItem("token")||"11111111111111111111"
 				);
 }