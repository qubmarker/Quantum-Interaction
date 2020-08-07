
var SPEED_D = 0.3;
var SPEED_H = 0.3;
var score_game=0;//游戏得分
var NAV_IS_PHONE=true;//默认手机端
var NAV_IS_PAD=false;//默认
//if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
if ((navigator.userAgent.match(/(phone|pod|iPhone|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  
   //alert('手机端');
   NAV_IS_PHONE=true;
   
}else{
   //alert('PC端')
   NAV_IS_PHONE=false;
}

if (navigator.userAgent.match(/(pad|pod|iPod|iPad)/i)){
	   NAV_IS_PAD=true;
	   
   }
//------------判断端口等级--------------
if(parseInt($("#gscorediv").attr("level"))>parseInt(localStorage.level)){
	if(!localStorage.level)localStorage.level=1;
	mui.toast("您还未完成"+localStorage.level+"关卡!");
	
}else{
	
	if(parseInt(localStorage.level)>8&&parseInt($("#gscorediv").attr("level"))==10){
		if(localStorage.isEngish=="true"){
			$("#gscorediv").html("level"+localStorage.level)
		}else{
			$("#gscorediv").html("关卡"+localStorage.level)
		}
		
	}
	
}



//---------------------------------------------------------------------
//公式-----------------HX    =  ZH

			var formula_word=[
				/* "<img style='width:8vw;filter: invert(100%);' src='../images/formula/h1s.png'/>"
			,"<img style='width:8vw;filter: invert(100%);' src='../images/formula/x1s.png'/>"
			,"<img style='width:8vw;filter: invert(100%);' src='../images/formula/y1s.png'/>"
			,"<img style='width:8vw;filter: invert(100%);' src='../images/formula/z1.png'/>", */
			"<img style='width:1.2vw;height:5.5vh;margin-right: 1vw;' src='../images/formula/a/2.png'/><img style='width:5vw;' src='../images/formula/a/h.png'/>"
			,"<img style='width:5vw;margin-right: 1vw;' src='../images/formula/a/x.png'/>"
			,"<img style='width:5vw;margin-right: 1vw;' src='../images/formula/a/y.png'/>"
			,"<img style='width:5vw;margin-right: 1vw;' src='../images/formula/a/z.png'/>"
			];
			
			var formula_word_obj={"41":"<img style='width:6vw;margin-bottom: -1.6vh;margin-right: 1vw;' src='../images/formula/a/cx.png'/>",
			"42":"<img style='width:6vw;margin-right: 1vw;margin-bottom: -1.6vh;' src='../images/formula/a/cy.png'/>",
			"43":"<img style='width:6vw;margin-right: 1vw;margin-bottom: -1.6vh;' src='../images/formula/a/cz.png'/>"
			}
			var h_img="../images/zimu/H.png";
			var x_img="../images/zimu/X.png";
			var y_img="../images/zimu/Y.png";
			var z_img="../images/zimu/Z.png";
			var c_img="../images/zimu/C.png";
			var imgList=[h_img,x_img,y_img,z_img,c_img];
			var  formula_word_zimu=[
				
				"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+h_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+x_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+y_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+z_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				
				
			];
			
			
			var  formula_word_zimu_obj={
				
				"H":"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+h_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"X":"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+x_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"N":"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+x_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"O":""
				,
				"T":""
				,
				"Y":"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+y_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,
				"Z":"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+z_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				,"=":"<img style='width: 1vw;height:2vh;margin-right: 0.5vw;margin-bottom: 0vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
				,"I":"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img class='ii' src='../images/formula/a/I.png' style='width: 0.5vw;height:3vh; top: 3.2vh; '></div>"
				,"C":"<div class='quantumf' style='position: relative;left: 2vw;width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img src='"+c_img+"' style='width: 3.5vw; top: 1.5vh; left: 0vw;'></div>"
				
				
			};
			
			
			var lenn = 1;
			 /* if(!NAV_IS_PHONE){
				lenn = 4;
			} */
			
			//表示有交换的公式
			var isTurn = 0;
			
			function createFormula(list){
				updateScoreAnd();
				console.log("----------------------------------------",list);
				isTurn = 1;
				if(list.length>3&&list[4][1]==-1){
					formula_word[list[4][1]]="<img style='height: 3vh;margin-right: 1vw;margin-bottom: 2.3vh;' src='../images/formula/a/I.png'/>";
				}else if(list.length>3&&list[1][1]==-1){
					formula_word[list[1][1]]="<img style='height: 3vh;margin-right: 1vw;margin-bottom: 2.3vh;' src='../images/formula/a/I.png'/>";
				}
				if($("#formula").find('.xiaoshi').length>lenn){
					/* $("#formula").find('p').eq(0).remove();
					$("#formula").find('p').eq(1).remove();
					$("#formula").find('p').eq(2).remove();
					$("#formula").find('p').eq(3).remove();
					$("#formula").find('p').eq(4).remove(); */
					 $("#formula").find('.xiaoshi').remove();
					 if(list.length>3){
						$("#formula").append('<div class="xiaoshi" style="display: flex;align-items: center;justify-content: center;">'+formFormula(list[2])+'</div>');
						// $("#formula").append('<p>'
						// +"<img style='height: 6vh;margin-right: 0.1vw;' src='../images/formula/a/zuo.png'/>"
						// +formula_word[list[0][0]]
						// +"<img style='width:1.2vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
						
						// +formula_word[list[3][0]]
						// +"<img style='height: 6vh;margin-left: 0.1vw;' src='../images/formula/a/you.png'/>"
						// +formula_word_obj[list[0][1]+""+list[3][1]]
						
						// //+'<span style="position: relative;top: -6px;font-size: 4vw;">=</span>'+
						// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						
						// +'<span style="position: relative;top: -9px;font-size: 4vw;">'
						// +(list[1][2]?'<img style="width: 1vw;margin-right: 1vw;margin-bottom: 2.3vh;" src="../images/formula/a/fu.png"/></span>':'</span>')
						// +formula_word_obj[list[1][0]+""+list[4][0]]
						
						// +"<img style='height: 6vh;margin-right: 0.1vw;' src='../images/formula/a/zuo.png'/>"
						
						// +formula_word[list[1][1]]+"<img style='width:1.2vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
						// +formula_word[list[4][1]]+"<img style='height: 6vh;margin-left: 0.1vw;' src='../images/formula/a/you.png'/>"
						// +'</p>');
						
					 }else{
						  
						  $("#formula").append('<div class="xiaoshi" style="display: flex;align-items: center;justify-content: center;">'+formFormula(list[2])+'</div>');
						  /* $("#formula").append('<p>'+formula_word[list[0][0]]+formula_word[list[0][1]]+'</p>');
						  $("#formula").append('<p>='+(list[1][2]?list[1][2]:'')+'</p>');
						  $("#formula").append('<p><span style="position: relative;top: -17px;font-size: 4vw;">'+(list[1][2]?list[1][2]+'</span>':'')+formula_word[list[1][0]]+formula_word[list[1][1]]+'</p>'); */
						  // $("#formula").append('<p>'+formula_word[list[0][0]]+formula_word[list[0][1]]
						  // +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						  // +'<span style="position: relative;top: -4px;font-size: 4vw;">'
						  // +(list[1][2]?'<img style="width: 1vw;margin-right: 1vw;margin-bottom: 2.3vh;" src="../images/formula/a/fu.png"/></span>':'</span>')
						  
						  
						  // +formula_word[list[1][0]]
						  // // +"<img style='width:1.5vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
						  // +formula_word[list[1][1]]+'</p>');
						 
					 }
					
				}else{
					if(list.length>3){
					$("#formula").append('<div class="xiaoshi" style="display: flex;align-items: center;justify-content: center;">'+formFormula(list[2])+'</div>');
					// $("#formula").append('<p>'
					// +"<img style='height: 6vh;margin-right: 0.1vw;' src='../images/formula/a/zuo.png'/>"
					// +formula_word[list[0][0]]
					// +"<img style='width:1.2vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
					
					// +formula_word[list[3][0]]
					// +"<img style='height: 6vh;margin-left: 0.1vw;' src='../images/formula/a/you.png'/>"
					// +formula_word_obj[list[0][1]+""+list[3][1]]
					
					// //+'<span style="position: relative;top: -6px;font-size: 4vw;">=</span>'+
					// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
					
					// +'<span style="position: relative;top: -9px;font-size: 4vw;">'
					// +(list[1][2]?'<img style="margin-right: 1vw;margin-bottom: 2.3vh;" src="../images/formula/a/fu.png"/></span>':'</span>')
					// +formula_word_obj[list[1][0]+""+list[4][0]]
					// +"<img style='height: 6vh;margin-right: 0.1vw;' src='../images/formula/a/zuo.png'/>"
					// +formula_word[list[1][1]]+"<img style='width:1.2vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
					// +formula_word[list[4][1]]+"<img style='height: 6vh;margin-left: 0.1vw;' src='../images/formula/a/you.png'/>"
					// +'</p>');
					
					}else{
						$("#formula").append('<div class="xiaoshi" style="display: flex;align-items: center;justify-content: center;">'+formFormula(list[2])+'</div>');
						// $("#formula").append('<p>'+formula_word[list[0][0]]+formula_word[list[0][1]]
						// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						// +'<span style="position: relative;top: -4px;font-size: 4vw;">'+(list[1][2]?'<img style="width: 1vw;margin-right: 1vw;margin-bottom: 2.3vh;" src="../images/formula/a/fu.png"/></span>':'</span>')
						// +formula_word[list[1][0]]+formula_word[list[1][1]]+'</p>');
					}
					
				}
				if(NAV_IS_PHONE){
					// $(div).find('img').css({'top':'1.1vh','left':'0.4vw'});
					$(".quantumf").find('img').css({'width': '4vw','top':'1vh','left':'0vw'});
					$(".quantumf").find('.ii').css({'top':'3vh'});
				}else{
						// $(div).find('img').css({'top':'5.2vh','left':'0.5vw'});
						$(".quantumf").find('img').css({'top':'1vh','left':'0vw'});
						$(".quantumf").find('.ii').css({'top':'3vh'});
				}
				if(NAV_IS_PAD||NAV_IS_PHONE){
					
					$(".quantumf").find('img').each(function(i ,item){
						if($(item).attr("src").indexOf("I.png")!=-1){
							
							$(item).css({'width': '1vw','top':'1vh','left':'0vw'});
						}
					});
					
					
				}
			}
			
			/* var h_img="../images/game/h.png";
			var x_img="../images/game/x.png";
			var y_img="../images/game/y.png";
			var z_img="../images/game/z.png";
			var c_img="../images/game/c.png"; */
			
			//接下来得抵消公式
			var u_img = "../images/formula/a/1001.png";
			var v_img = "../images/formula/a/2002.png";
			var  formula_word_zimu_next=[
				// "<img style='width:1.2vw;height:5.5vh;margin-right: 1vw;' src='../images/formula/a/2.png'/><img style='height: 6vh;margin-right: 0.1vw;' src='"+v_img+"'/>"
				// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/><img style='height: 6vh;margin-right: 0.1vw;' src='"+u_img+"'/>"
				"<img style='width: 1vw;height:2vh;margin-right: 0.5vw;margin-bottom: 0vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
				+"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img class='ii' src='../images/formula/a/I.png' style='width: 0.5vw;height:3vh; top: 3.2vh; '></div>"
				,
				 // "<img style='height: 6vh;margin-right: 0.1vw;' src='"+u_img+"'/>"
				"<img style='width: 1vw;height:2vh;margin-right: 0.5vw;margin-bottom: 0vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"+"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img class='ii' src='../images/formula/a/I.png' style='width: 0.5vw;height:3vh; top: 3.2vh; '></div>"
				
				,
				 // "<img style='height: 6vh;margin-right: 0.1vw;' src='"+u_img+"'/>"
				"<img style='width: 1vw;height:2vh;margin-right: 0.5vw;margin-bottom: 0vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"+"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img class='ii' src='../images/formula/a/I.png' style='width: 0.5vw;height:3vh; top: 3.2vh; '></div>"
				
				,
				// "<img style='height: 6vh;margin-right: 0.1vw;' src='"+u_img+"'/>",
				"<img style='width: 1vw;height:2vh;margin-right: 0.5vw;margin-bottom: 0vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"+"<div class='quantumf' style='width: 5vw; height: 10vh; background: url(&quot;../images/square/3.png&quot;) 0% 0% / 5vw 10vh no-repeat;'>"
				+"<img class='ii' src='../images/formula/a/I.png' style='width: 0.5vw;height:3vh; top: 3.2vh; '></div>"
				
			];
			/**消失的方块显示在公式栏**/
			function showDisplay(a,b){
				isTurn = 0;
				var srr = ["h","x","y","z"];
				
				// if($("#formula").find('p').length>lenn+1){
				// 	$("#formula").find('p').remove();
				// 	$("#formula").append('<p>消失量子门：'+srr[parseInt(a["_type"])]+srr[parseInt(b["_type"])]+'</p>');
					
				// }else{
					if(a["_hxh"]=="true"){
						// $("#formula").append('<p>三量子门变换：HXH=Z</p>');
						 var aaa = creatOther(a);
						 var bbb = creatOther(b);
						if($(".xiaoshi").length>1){
							$(".xiaoshi").remove();
						}
						// $("#formula").append('<p>HXH=Z</p>');
						// $("#formula").append('<p class="xiaoshi">消失量子门：'+formula_word[parseInt(a["_type"])]+'</p>');
						$("#formula").append('<div class="xiaoshi" style="display: flex;align-items: center;justify-content: center;">'
						+formula_word_zimu[0]+formula_word_zimu[1]+formula_word_zimu[0]
					 // +bbb.outerHTML+aaa.outerHTML+bbb.outerHTML
					//+formula_word_zimu_obj["H"]
						// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						// +formula_word[0]+formula_word[1]+formula_word[parseInt(0)]
						// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						// +formula_word[3]
						 +"<img style='width: 1vw;height:2vh;margin-right: 0.5vw;margin-bottom: 0vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						+formula_word_zimu[3]
						+'</div>');
						
					
						
					}else{
						var aaa = creatOther(a);
						var bbb = creatOther(a,b.style.background);
						if($(".xiaoshi").length>1){
							$(".xiaoshi").remove();
						}
						// $("#formula").append('<p class="xiaoshi">消失量子门：'+formula_word[parseInt(a["_type"])]+'</p>');
						$("#formula").append('<div class="xiaoshi" style="display: flex;align-items: center;justify-content: center;">'
						// +formula_word_zimu[parseInt(a["_type"])]+formula_word_zimu[parseInt(b["_type"])]
						+aaa.outerHTML+bbb.outerHTML
						
						
						// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						// +formula_word[parseInt(a["_type"])]+formula_word[parseInt(a["_type"])]
						// +"<img style='width: 1vw;margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
						+formula_word_zimu_next[parseInt(a["_type"])]
						+'</div>');
						
					}
					if(NAV_IS_PHONE){
						// $(div).find('img').css({'top':'1.1vh','left':'0.4vw'});
						$(".quantumf").find('img').css({'width': '4vw','top':'1vh','left':'0vw'});
						$(".quantumf").find('.ii').css({'top':'3vh'});
					}else{
							// $(div).find('img').css({'top':'5.2vh','left':'0.5vw'});
							$(".quantumf").find('img').css({'top':'1vh','left':'0vw'});
							$(".quantumf").find('.ii').css({'top':'3vh'});
					}
					if(NAV_IS_PAD||NAV_IS_PHONE){
						
						$(".quantumf").find('img').each(function(i ,item){
							if($(item).attr("src").indexOf("I.png")!=-1){
								
								$(item).css({'width': '1vw','top':'3vh','left':'0vw'});
							}
						});
						
						
					}
					//$("#formula").append(creatOther(a))
					//$("#formula").append(creatOther(b))
				// }
			}
			
			var  formulaList = [ [[0,1],[3,0],"HX=ZH"],
				//XH  =  HZ	
				[[1,0],[0,3],"XH=HZ"],
				//HY=-YH
				[[0,2],[2,0,"-"],"HY=-YH"],
				//XY=-YX
				[[1,2],[2,1,"-"],"XY=-YX"],
				//XZ=-ZX
				[[1,3],[3,1,"-"],"XZ=-ZX"],
				//YZ=-ZY
				[[2,3],[3,2,"-"],"YZ=-ZY"]
				//(X⊗X)CNOT=CNOT(X⊗I)    4:CNOTCX    5:(X⊗X)   14:(X⊗I)
				,[[1,4],[4,1],"(X⊗X)CNOT=CNOT(X⊗I)",[1,1],[1,-1]]//-1表示抵消了什么也没有
				//,[[4,1],[1,4],"(X⊗X)CNOT=CNOT(X⊗I)",[1,-1],[1,1]]//-1表示抵消了什么也没有
				//(X⊗Y)CNOT=CNOT(Y⊗Z)    4:CNOTCX    6:(X⊗Y)   10:(Y⊗Z)
				,[[1,4],[4,2],"(X⊗Y)CNOT=CNOT(Y⊗Z)",[2,1],[1,3]]
				//,[[4,2],[1,4],"(X⊗Y)CNOT=CNOT(Y⊗Z)",[1,3],[2,1]]
				//(X⊗Z)CNOT=-CNOT(Y⊗Y)   4:CNOTCX    7:(X⊗Z)   9:(Y⊗Y)
				,[[1,4],[4,2,"-"],"(X⊗Z)CNOT=-CNOT(Y⊗Y)",[3,1],[1,2]]
				//,[[4,2],[1,4],"(X⊗Y)CNOT=CNOT(Y⊗Z)",[1,2],[3,1]]
				//(Y⊗X)CNOT=CNOT(Y⊗I)
				,[[2,4],[4,2],"(Y⊗X)CNOT=CNOT(Y⊗I)",[1,1],[1,-1]]//-1表示抵消了什么也没有
				//(Y⊗Y)CNOT=-CNOT(X⊗Z)
				,[[2,4],[4,1],"(Y⊗Y)CNOT=-CNOT(X⊗Z)",[2,1],[1,3]]
				//(Y⊗Z)CNOT=CNOT(X⊗Y)
				,[[2,4],[4,1],"(Y⊗Z)CNOT=CNOT(X⊗Y)",[3,1],[1,2]]
				//(Z⊗X)CNOT=CNOT(Z⊗X)
				,[[3,4],[4,3],"(Z⊗X)CNOT=CNOT(Z⊗X)",[1,1],[1,1]]
				//(Z⊗Y)CNOT=CNOT(I⊗Y)
				,[[3,4],[4,-1],"(Z⊗Y)CNOT=CNOT(I⊗Y)",[2,1],[1,2]]
				//(Z⊗Z)CNOT=CNOT(I⊗Z)
				,[[3,4],[4,-1],"(Z⊗Z)CNOT=CNOT(I⊗Z)",[3,1],[1,3]]
				//(X⊗X)CY=-CY(Y⊗Z)
				,[[1,4],[4,2,"-"],"(X⊗X)CY=-CY(Y⊗Z)",[1,2],[2,3]]
				//(X⊗Y)CY=CY(X⊗I)
				,[[1,4],[4,1],"(X⊗Y)CY=CY(X⊗I)",[2,2],[2,-1]]
				//(X⊗Z)CY=CY(Y⊗X)
				,[[1,4],[4,2],"(X⊗Z)CY=CY(Y⊗X)",[3,2],[2,1]]
				//(Y⊗X)CY=CY(X⊗Z)
				,[[2,4],[4,1],"(Y⊗X)CY=CY(X⊗Z)",[1,2],[2,3]]
				//(Y⊗Y)CY=CY(Y⊗I)
				,[[2,4],[4,2],"(Y⊗Y)CY=CY(Y⊗I)",[2,2],[2,-1]]
				//(Y⊗Z)CY=-CY(X⊗X)
				,[[2,4],[4,1,"-"],"(Y⊗Z)CY=-CY(X⊗X)",[3,2],[2,1]]
				//(Z⊗X)CY=CY(I⊗X)
				,[[3,4],[4,-1],"(Z⊗X)CY=CY(I⊗X)",[1,2],[2,1]]
				//(Z⊗Y)CY=CY(Z⊗Y)
				,[[3,4],[4,3],"(Z⊗Y)CY=CY(Z⊗Y)",[2,2],[2,2]]
				//(Z⊗Z)CY=CY(I⊗Z)
				,[[3,4],[4,-1],"(Z⊗Z)CY=CY(I⊗Z)",[3,2],[2,3]]
				//(X⊗X)CZ=CZ(Y⊗Y)
				,[[1,4],[4,2],"(X⊗X)CZ=CZ(Y⊗Y)",[1,3],[3,2]]
				//(X⊗Y)CZ=-CZ(Y⊗X)
				,[[1,4],[4,2],"(X⊗Y)CZ=-CZ(Y⊗X)",[2,3],[3,1]]
				//(X⊗Z)CZ=CZ(X⊗I)
				,[[1,4],[4,1],"(X⊗Z)CZ=CZ(X⊗I)",[3,3],[3,-1]]
				//(Y⊗X)CZ=-CZ(X⊗Y)
				,[[2,4],[4,1,"-"],"(Y⊗X)CZ=-CZ(X⊗Y)",[1,3],[3,2]]
				//(Y⊗Y)CZ=CZ(X⊗X)
				,[[2,4],[4,1],"(Y⊗Y)CZ=CZ(X⊗X)",[2,3],[3,1]]
				//(Y⊗Z)CZ=CZ(Y⊗I)
				,[[2,4],[4,2],"(Y⊗Z)CZ=CZ(Y⊗I)",[3,3],[3,-1]]
				//(Z⊗X)CZ=CZ(I⊗X)
				,[[3,4],[4,-1],"(Z⊗X)CZ=CZ(I⊗X)",[1,3],[3,1]]
				//(Z⊗Y)CZ=CZ(I⊗Y)
				,[[3,4],[4,-1],"(Z⊗X)CZ=CZ(I⊗X)",[2,3],[3,2]]
				//(Z⊗Z)CZ=CZ(Z⊗Z)
				,[[3,4],[4,3],"(Z⊗Z)CZ=CZ(Z⊗Z)",[3,3],[3,3]]
				
			 ];
			
			
			
			var bgList=[
				
				"../images/square/0.png",
				"../images/square/1.png",
				"../images/square/2.png",
				"../images/square/3.png",
				"../images/square/4.png"
				
			]
			
			
			// h,x,y,z   0,1,2,3
			var arr=[];
			var err=[0,1,2,3,4];
//---------------------------------------------------------------------



/* ————————————————
版权声明：本文为CSDN博主「疯三年」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/namechenfl/article/details/83035897 */

var baoList = [];
var otherList = [];
			function creatBao( x,y ){
				 var div = document.createElement('div');
				 if(NAV_IS_PHONE){
					 div.style.left = x;
					 div.style.top = y;
				 }else{
					 div.style.left = parseFloat(x)+40+"px";
					 div.style.top = parseFloat(y)+40+"px";
				 }
				
				baoList.push(div)
				$('body').append(div);
				$(div).addClass('tuski');
				var time = setTimeout(function(){
					for(var i=0,m=baoList.length;i<m;i++){
						 $(baoList[i]).remove();
					}
					clearTimeout(time);
				},600) 
			}
			function creatOther( quantum ,background){
				 // var div = document.createElement('img');
				var div = document.createElement('div');
					 // div.style.left =quantum.style.left;
					 // div.style.top =quantum.style.top;
				div.style.width = "5vw"//
				// div.style.width = quantum.style.width;
				div.style.height = "10vh"//
				// div.style.height = quantum.style.height;
				if(background){
						div.style.background =  background;
					}else{
						div.style.background =  quantum.style.background;
					}
				
				div.style.backgroundSize="5vw 10vh"
				//div.src = $(quantum).find('img').attr("src")
				otherList.push(div)
				// $('body').append(div);
				 $(div).addClass('quantumf');
				$(div).html( quantum.innerHTML);
				// TweenLite.to(div.style, 1, {top:"-20vh",onComplete:function(){
				if(NAV_IS_PHONE){
					// $(div).find('img').css({'top':'1.1vh','left':'0.4vw'});
					$(div).find('img').css({'width': '4vw','top':'1vh','left':'0vw'});
				}else{
						// $(div).find('img').css({'top':'5.2vh','left':'0.5vw'});
						$(div).find('img').css({'top':'1vh','left':'0vw'});
				}
					
				// }});
				return div;
				 
				// var time = setTimeout(function(){
				// 	for(var i=0,m=otherList.length;i<m;i++){
				// 		 $(otherList[i]).remove();
				// 	}
				// 	clearTimeout(time);
				// },600) 
			}
			//根据公式显示
			function formFormula(f){
				var div = "";
				for(var i=0,m=f.length;i<m;i++){
					var a = f.substring(i,i+1);
					var k = formula_word_zimu_obj[a];
					if(k!=null&&k!=undefined){
						div+=k;
					}else{
						div+=a;
					}
					
				}
				
				return div;
			}
//用公式来提醒
var callYouCount = 0,lastScore=0,shenList=[];
function callYou(){
	
	if(isTurn==1){
		// mui.toast("减2分");
		// score_game-=2;
		// score_progressbar.style.width = score_game+"%";
		// score_progresstxt.innerHTML = score_game;
		// isTurn=0;
	}
	
	
	if(callYouCount==0){
		
		lastScore=score_game;
		
	}
	callYouCount++;
	
	if(callYouCount==7){
		
		if(shenList.length>0){
			$(shenList[0]).removeClass("shake-ss");
			// $(shenList[1]).removeClass("shake");
			$(shenList[1]).removeClass("shake-ss");
		}
		
		shenList=[];
		$(".calltips").remove();
	}
	
	if(shenList.length>0){
		/* if(callYouCount%2!=0){
			shenList[0].style.top = parseInt(shenList[0].style.top)+10+'px';
			shenList[1].style.top = parseInt(shenList[1].style.top)+10+'px';
		}else{
			shenList[0].style.top = parseInt(shenList[0].style.top)-10+'px';
			shenList[1].style.top = parseInt(shenList[1].style.top)-10+'px';
		} */
		if(callYouCount<8){
			// $(shenList[0]).addClass("shake");
			$(shenList[0]).addClass("shake-ss");
			// $(shenList[1]).addClass("shake");
			$(shenList[1]).addClass("shake-ss");
		}else{
			// $(shenList[0]).removeClass("shake");
			
		}
	}
	
	if(callYouCount==8){
		if(lastScore==score_game){
			//分数经过5秒还没改变就作出提示
			console.log("分数经过8秒还没改变就作出提示");
			
			var first = null,second=null,third=null,callList=[],current_t=1;
			function quant(t){
				current_t = t;
				if($("#square"+t).length==0)return;
				
				//var lastSquareWeUse = null;
				var sList = [];//保存从小到大的顺序square
				$("#square"+t+" .quantum").each(function(i,item){
					
					//var left = parseInt(item.style.left);
					//console.log("排序==",i,item["_type"]);
					sList.push(item);
					
					
				});
				sList.sort(function(a,b){
					
					return parseInt(a.style.left)-parseInt(b.style.left);
				})
				/* $(sList).each(function(i,item){
					console.log("排序后的==",parseInt(item.style.left),item["_type"]);
					
				}) */
				//console.log(sList);
				//惨痛教训，在双量子门那几关顺序是不对的
				$(sList).each(function(i,item){
					
					if(i>1){
						first=$(sList).eq(i-2);//$("#square"+t+" .quantum").eq(i-2);
						second=$(sList).eq(i-1);//$("#square"+t+" .quantum").eq(i-1);
						third = item;
						
						if( !first[0]["_parent"]&&!first[0]["_child"]&&!third["_parent"]&&!third["_child"]&&!second[0]["_parent"]&&!second[0]["_child"]&&third["_type"]!=4
						&&second[0]["_type"]!=4&&second[0]["_type"]!=0
						&&third["_type"]==first[0]["_type"]){
							console.log(third["_type"],first[0]["_type"]);
							
							callList.push([first[0],second[0],third]);
						}else if( !first[0]["_parent"]&&!first[0]["_child"]&&!third["_parent"]&&!third["_child"]&&second[0]["_type"]==0
						&&((first[0]["_type"]==1&&third["_type"]==3)||(first[0]["_type"]==3&&third["_type"]==1||(third["_type"]==first[0]["_type"]&&third["_type"]==2)))
						){
							console.log("当中间是0时",third["_type"],first[0]["_type"]);
							
							callList.push([first[0],second[0],third]);
						}
					}
					
					
				});
				if(callList.length==0){
					first = null;second=null;third=null;
					current_t=t+1;
					quant(t+1);
				}
			}
			quant(1);
			
			if(callList.length>0){
				first=callList[0][0];
				second = callList[0][1];
				third=callList[0][2];
				shenList=[first,third];
				/* var div = document.createElement('div');
				div.style.left = second.style.left;
				div.style.top = second.style.top;
				div.style["z-index"]=9
				baoList.push(div)
				$('#square'+current_t).append(div);
				$(div).addClass('calltips'); */
				if(teachMask.style.display!="none"){
					var ffrr=["H","X","Y","Z","C"];
					tips.innerHTML = "试着把"+ffrr[parseInt(second["_type"])]+"和"+ffrr[parseInt(first["_type"])]+"或者"+ffrr[parseInt(third["_type"])]+"进行交换～";
					var finger = document.getElementById("finger");
					var square = document.getElementById('square'+current_t);
					finger.style.left = 28+parseInt(first.style.left)+"vw";
					finger.style.top = (current_t-1)*15+28+"vh";//square.style.top;
					var fingerup = document.getElementById("fingerup");
					fingerup.style.left = 28+parseInt(third.style.left)+"vw";
					fingerup.style.top = (current_t-1)*15+28+"vh";
					
					TweenLite.to(finger.style, 0.7, {left:28+parseInt(third.style.left)+"vw",onComplete:function(){
						
					}}); 
					TweenLite.to(fingerup.style, 0.7, {left:28+parseInt(first.style.left)+"vw",onComplete:function(){
						
					}}); 
					console.log(square,"=@===",square.style.left,square.style.top);
					
					var teachMaskTime = setTimeout(function(){
						teachMask.style.display="none";
						clearTimeout(teachMaskTime)
					},3000)
					
				}
			}
			
		}
		
		
		callYouCount=0;
	}
	
}


var xiaochuCount = 1;
var formulaTip = [],formulaSquare=[];//只保留一条数据
//按提示消除量子方块
function xiaochu(){
	if(formulaTip.length==1){
		
		callYouCount++;
		
		
		if(callYouCount==8){
			
			if(shenList.length>0){
				$(shenList[0]).removeClass("shake-ss");
				// $(shenList[1]).removeClass("shake");
				$(shenList[1]).removeClass("shake-ss");
			}
			
			shenList=[];
			$(".calltips").remove();
			callYouCount=0;
		}
		
			if(shenList.length>0){
				/* if(callYouCount%2!=0){
					shenList[0].style.top = parseInt(shenList[0].style.top)+10+'px';
					shenList[1].style.top = parseInt(shenList[1].style.top)+10+'px';
				}else{
					shenList[0].style.top = parseInt(shenList[0].style.top)-10+'px';
					shenList[1].style.top = parseInt(shenList[1].style.top)-10+'px';
				} */
				if(callYouCount<8&&callYouCount>5){
					// $(shenList[0]).addClass("shake");
					$(shenList[0]).addClass("shake-ss");
					// $(shenList[1]).addClass("shake");
					$(shenList[1]).addClass("shake-ss");
				}else{
					// $(shenList[0]).removeClass("shake");
					
				}
			}
		
		
		
		
		
		
		return;
	}
	if(xiaochuCount==0){
		
		lastScore=score_game;
		
	}
	xiaochuCount++;
	
	if(xiaochuCount==1){
		
		if(shenList.length>0){
			
		}
		
		shenList=[];
		$(".calltips").remove();
	}
	
	if(shenList.length>0){
		
	}
	
	if(xiaochuCount==2){
		if(lastScore==score_game){
			//分数经过5秒还没改变就作出提示
			console.log("分数经过5秒还没改变就作出提示");
			
			var first = null,second=null,third=null,callList=[],current_t=1;
			function quant(t){
				current_t = t;
				if($("#square"+t).length==0)return;
				var sList = [];//保存从小到大的顺序square
				$("#square"+t+" .quantum").each(function(i,item){
					
					//var left = parseInt(item.style.left);
					sList.push(item);
					
					
				});
				sList.sort(function(a,b){
					
					return parseInt(a.style.left)-parseInt(b.style.left);
				})
				$(sList).each(function(i,item){
					
					if(i>1){
						first=$(sList).eq(i-2);//$("#square"+t+" .quantum").eq(i-2);
						second=$(sList).eq(i-1);//$("#square"+t+" .quantum").eq(i-1);
						third = item;
						
						if( !first[0]["_parent"]&&!first[0]["_child"]&&!third["_parent"]&&!third["_child"]&&!second[0]["_parent"]&&!second[0]["_child"]&&second["_type"]!=4&&third["_type"]!=4
						&&second[0]["_type"]!=0
						&&third["_type"]==first[0]["_type"]){
							console.log(third["_type"],first[0]["_type"]);
							
							callList.push([first[0],second[0],third]);
						}else if( !first[0]["_parent"]&&!first[0]["_child"]&&!third["_parent"]&&!third["_child"]&&second[0]["_type"]==0
						&&((first[0]["_type"]==1&&third["_type"]==3)||(first[0]["_type"]==3&&third["_type"]==1||(third["_type"]==first[0]["_type"]&&third["_type"]==2)))
						){
							console.log("当中间是0时",third["_type"],first[0]["_type"]);
							
							callList.push([first[0],second[0],third]);
						}
					}
					
					
				});
				if(callList.length==0){
					first = null;second=null;third=null;
					current_t=t+1;
					quant(t+1);
				}
			}
			quant(1);
			
			if(callList.length>0){
				first=callList[0][0];
				second = callList[0][1];
				third=callList[0][2];
				shenList=[first,third];
				/* var div = document.createElement('div');
				div.style.left = second.style.left;
				div.style.top = second.style.top;
				div.style["z-index"]=9
				baoList.push(div)
				$('#square'+current_t).append(div);
				$(div).addClass('calltips'); */
				var ffrr=["H","X","Y","Z","C"];
				
				for(var i=0,m=formulaList.length;i<m;i++){
					var formula = formulaList[i];
					
					if((formula[0][0]==first["_type"]&&formula[0][1]==second["_type"])||(formula[1][0]==first["_type"]&&formula[1][1]==second["_type"])){
						//alert("请按照公式"+formula[2]+"消除量子");
						formulaTip=[formula[2]];
						formulaSquare=formula;//[first["_type"],second["_type"]];
						
						var mm = '请按如下公式消除'
						if(localStorage.isEngish=="true"){
							 mm = 'Please eliminate according to the following formula'
						}else{
							
						}
						
						if($("#formula").find('p').length>4){
							$("#formula").find('p').eq(0).remove();
							$("#formula").find('p').eq(1).remove();
							$("#formula").append('<p>'+mm+'</p>');
							// $("#formula").append('<p>'+formula[2]+'</p>');
							createFormula(formula);
						}else{
							$("#formula").append('<p>'+mm+'</p>');
							// $("#formula").append('<p>公式:'+formula[2]+'</p>');
							createFormula(formula);
						}
						
						break;
					}
					
				}
				
				
			}
			
		}
		
		
		xiaochuCount=0;
	}
	
	
}


var videond = document.getElementById("myVideo");

  videond.addEventListener("ended",function(){
	  videond.currentTime=2; 
	  videond.play();
         console.log("结束");
    })
	
	
	
	
	
	
	
var nowparentSquareName=null;
function squareclick(e) {
				if(shenList.length>0){
					$(shenList[0]).removeClass("shake-ss");
					// $(shenList[1]).removeClass("shake");
					$(shenList[1]).removeClass("shake-ss");
					shenList=[];
				}
				// if(currentSquare)
				// console.log("2=============================",currentSquare["parentSquareName"]);
				console.log(e.currentTarget,e.currentTarget["_parent"],e.currentTarget["_child"]);
				if(currentSquare&&currentSquare!=e.currentTarget){
					
					
					
					if(currentSquare["parentSquareName"]!=e.currentTarget["parentSquareName"]){
						// console.log("1=============================",currentSquare["parentSquareName"]);
						// mui.toast("不同行不能消");
						$(currentSquare["parentSquareName"]).find(".quantum").each(function(i,item){
							
							//var left = parseInt(item.style.left);
							$(item).find('img')[0].style.border="";
						});
						
						$(currentSquare).find('img')[0].style.border="";
						currentSquare = null;
						// $(e.currentTarget).find('img')[0].style.border="5px solid #a4efcf";
						currentSquare = e.currentTarget;
						return;
					}
					// else if(currentSquare["parentSquareName"]==e.currentTarget["parentSquareName"]){
						
						
					// }
					
					/* if(currentSquare["_type"]==e.currentTarget["_type"]){
						console.log("相同得量子门无法抵消");
						return;
					} */
					if(Math.abs(parseInt(currentSquare.style.left)-parseInt(e.currentTarget.style.left))!=6){
						console.log("不相邻的量子门无法抵消");
						$(currentSquare).find('img')[0].style.border="";
						currentSquare = e.currentTarget;
						// $(currentSquare).find('img')[0].style.border="5px solid #a4efcf";
						return;
					}
					/* if(currentSquare["_child"]==e.currentTarget){
						console.log("双比特");
						return;
					}
					if(currentSquare["_parent"]==e.currentTarget){
						console.log("双比特");
						return;
					} */
					lastSquare = currentSquare;
					currentSquare = e.currentTarget;
					nowparentSquareName = e.currentTarget["parentSquareName"];
					whois(currentSquare,lastSquare,e.currentTarget["parentSquareName"]);
					currentSquare=null;
					lastSquare=null;
					/* if(!isSame){
						lastSquare.style.border="";
						currentSquare.style.border="";
						currentSquare=null;
						lastSquare=null;
					} */
					//先点右边再点左边
					/*if( lastSquare["_index"]> currentSquare["_index"]){
						
						//HX=ZH  01换成30
						if(currentSquare["_type"] ==0&&lastSquare["_type"] ==1){
							currentSquare.src=imgList[3];
							currentSquare["_type"]=3;
							var tmp = currentSquare["_index"];
							currentSquare["_index"]=lastSquare["_index"];
							lastSquare["_index"] = tmp;
							lastSquare.src=imgList[0];
							lastSquare["_type"]=0;
							
						//XH=HZ  10换成03
						}else if(currentSquare["_type"] ==1&&lastSquare["_type"] ==0){
							currentSquare.src=imgList[0];
							currentSquare["_type"]=0;
							var tmp = currentSquare["_index"];
							currentSquare["_index"]=lastSquare["_index"];
							lastSquare["_index"] = tmp;
							lastSquare.src=imgList[3];
							lastSquare["_type"]=3;
						
						//HY=-YH  02换成20
						}else if(currentSquare["_type"] ==0&&lastSquare["_type"] ==2){
							currentSquare.src=imgList[2];
							currentSquare["_type"]=2;
							var tmp = currentSquare["_index"];
							currentSquare["_index"]=lastSquare["_index"];
							lastSquare["_index"] = tmp;
							lastSquare.src=imgList[0];
							lastSquare["_type"]=0;
						
						//XY=-YX  12换成21
						}else if(currentSquare["_type"] ==1&&lastSquare["_type"] ==2){
							currentSquare.src=imgList[2];
							currentSquare["_type"]=2;
							var tmp = currentSquare["_index"];
							currentSquare["_index"]=lastSquare["_index"];
							lastSquare["_index"] = tmp;
							lastSquare.src=imgList[1];
							lastSquare["_type"]=1;
						
						//XZ=-ZX  13换成31
						}else if(currentSquare["_type"] ==1&&lastSquare["_type"] ==3){
							currentSquare.src=imgList[3];
							currentSquare["_type"]=3;
							var tmp = currentSquare["_index"];
							currentSquare["_index"]=lastSquare["_index"];
							lastSquare["_index"] = tmp;
							lastSquare.src=imgList[1];
							lastSquare["_type"]=1;
						
						//YZ=-ZY  23换成32
						}else if(currentSquare["_type"] ==2&&lastSquare["_type"] ==3){
							currentSquare.src=imgList[3];
							currentSquare["_type"]=3;
							var tmp = currentSquare["_index"];
							currentSquare["_index"]=lastSquare["_index"];
							lastSquare["_index"] = tmp;
							lastSquare.src=imgList[2];
							lastSquare["_type"]=2;
						}
					}*/
					
					
					
					
					
					
					
					
					
				}else if(currentSquare&&currentSquare==e.currentTarget){
					console.log("点击得同一个");
					
					$(currentSquare).find('img')[0].style.border="";
					currentSquare = null;
				}else{
					
					currentSquare = e.currentTarget;
					$(currentSquare["parentSquareName"]).find(".quantum").each(function(i,item){
						
						//var left = parseInt(item.style.left);
						$(item).find('img')[0].style.border="";
					});
					
					$(currentSquare).find('img')[0].style.border="5px dashed #a4efcf";
					//console.log(currentSquare["_parent"],currentSquare["_child"]);
					
				}
			}
			
			
			
			
			
			
			
	//----判断HXH=Z--------		
	function checkHXH(){
		
		console.log("----开始判断--------");
		var first = null,second=null,third=null,callList=[],current_t=1;
		function quant(squareParent){
			
			if($(squareParent).length==0)return;
			
			//var lastSquareWeUse = null;
			var sList = [];//保存从小到大的顺序square
			$(squareParent+" .quantum").each(function(i,item){
				
				//var left = parseInt(item.style.left);
				console.log("排序==",i,item["_type"]);
				sList.push(item);
				
				
			});
			sList.sort(function(a,b){
				
				return parseInt(a.style.left)-parseInt(b.style.left);
			})
			
			//console.log(sList);
			//惨痛教训，在双量子门那几关顺序是不对的
			$(sList).each(function(i,item){
				
				if(i>1){
					first=$(sList).eq(i-2);
					second=$(sList).eq(i-1);
					third = item;
					
					if( !first[0]["_parent"]&&!first[0]["_child"]&&!third["_parent"]&&!third["_child"]&&!second[0]["_parent"]&&!second[0]["_child"]
					&&third["_type"]==0
					&&first[0]["_type"]==0&&second[0]["_type"]==1
					){
						console.log("符合HXH");
						first[0]["_type"]=3;
						
						first.find("img").attr("src","../images/zimu/Z.png");
						second[0]["_hxh"]=third["_hxh"]="true";
						second[0]["_type"]=third["_type"];
						
						
					}
				}
				
				
			});
		
		}
		quant(nowparentSquareName);
		
	}
	
	
	var score_progressbar = document.getElementById("score_progressbar");
	var score_progresstxt = document.getElementById("score_progresstxt");
	/**得分**/
	function defengHandler(){
		var L = $("#gscorediv").attr("level");
		var last = score_game;
		if(L==1)
		{
			score_game+=5;
		}else if(L==2)
		{
			score_game+=5;
		}else if(L==3)
		{
			score_game+=5;
		}else if(L==4)
		{
			score_game+=5;
		}else if(L==5)
		{
			score_game+=4;
		}else if(L==6)
		{
			score_game+=4;
		}else{
			score_game+=4;
		}
		
		
			// $("#scorediv").html("得分 "+ (score_game+=5));
		score_progressbar.style.width = score_game+"%";
		score_progresstxt.innerHTML = score_game;
		$("body").append('<div class="defeng scoreminus" style="position: absolute;right: 30vw;    top: 13vh;color: goldenrod;font-size: 2.5vw;display: flex;align-items: center;justify-content: center;">'
		+'+'+(score_game-last)
		+'</div>');
		
		var time = setTimeout(function(){
			clearTimeout(time);
			 $(".scoreminus").fadeOut(3000);
		},500);
	}
	
	
	creatQueryFormula();
	creatQueryRule();
	/**创建查看公司按钮**/
	function  creatQueryFormula(){
		var div = document.createElement('div');
		div.style.position="absolute";
		div.style.left = "0px";
		div.style.top="40vh";
		//$(div).addClass();
		$("body").append(div);
		
		var img = document.createElement('img');
		
		img.src="../images/formula/query.png";
		img.style.width="4vw";
		$(div).append(img);
		var textdiv = document.createElement('div');
		textdiv.style.position="absolute";
		textdiv.style.left = "0px";
		textdiv.innerHTML="查看所有公式";
		textdiv.style.width="4vw";
		textdiv.style.top="0px";
		textdiv.className="textdiv"
		//$(div).addClass();
		$(div).append(textdiv);
		
		if(NAV_IS_PAD){
			$(".textdiv").css({'font-size': '2vh','line-height': '3vh'});
		}
		
		
		
		var chalanFormula = document.createElement('div');
		chalanFormula.id="chalanFormula";
		chalanFormula.style.left="16vw";
		chalanFormula.style.position="absolute";
		chalanFormula.style.top="0px";
		chalanFormula.style.zIndex=100;
		chalanFormula.style.backgroundColor="black";
		chalanFormula.style.display="none";
		chalanFormula.style.height="100vh";
		chalanFormula.style.width="70vw";
		chalanFormula.style.overflowY="auto";
		chalanFormula.style.color="#78CBD3";
		//$("#chalanFormula").hide();
		$("body").append(chalanFormula);
		var img = document.createElement('img');
		img.src = "../images/formula/all.png";
		img.style.width="70vw"
		$(chalanFormula).append(img);
		
		// for(var i=0,m=formulaList.length;i<m;i++){
		// 	var item = formulaList[i];
		// 	 chalanFormulaHandler(item)
			
		// }
		
		div.addEventListener('tap',function(){
			console.log("查看公式");
			isPause = !isPause;
			if($("#chalanFormula").is(":visible")){
				$("#chalanFormula").hide();
			}else
			$("#chalanFormula").show();
			
		});
		
	}
	
	/**查看公式**/
	function chalanFormulaHandler(list){
		console.log("查看公式",list);
		if(list.length>3&&list[4][1]==-1){
			formula_word[list[4][1]]="<img style='height: 3vh;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/I.png'/>";
		}else if(list.length>3&&list[1][1]==-1){
			formula_word[list[1][1]]="<img style='height: 3vh;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/I.png'/>";
		}
		
			if(list.length>3){
			$("#chalanFormula").append('<p style="    text-align: center;color: rgb(120, 203, 211);">'+list[2]+'</p>');
			$("#chalanFormula").append('<p style="    text-align: center;">'
			+"<img style='width: 0.6vw;height: 6vh;margin-right: 0.1vw;' src='../images/formula/a/zuo.png'/>"
			+formula_word[list[0][0]]
			+"<img style='width:1vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
			
			+formula_word[list[3][0]]
			+"<img style='width: 0.6vw;height: 6vh;margin-left: 0.1vw;' src='../images/formula/a/you.png'/>"
			+formula_word_obj[list[0][1]+""+list[3][1]]
			
			//+'<span style="position: relative;top: -6px;font-size: 4vw;">=</span>'+
			+"<img style='margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
			
			+'<span style="position: relative;top: -9px;font-size: 4vw;color: rgb(120, 203, 211);">'
			+(list[1][2]?'<img style="width: 1vw;margin-right: 1vw;margin-bottom: 1.7vh;" src="../images/formula/a/fu.png"/></span>':'</span>')
			+formula_word_obj[list[1][0]+""+list[4][0]]
			+"<img style='width: 0.6vw;height: 6vh;margin-right: 0.1vw;' src='../images/formula/a/zuo.png'/>"
			+formula_word[list[1][1]]+"<img style='width:1vw;margin-right: 1vw;margin-bottom: 2vh;' src='../images/formula/a/p.png'/>"
			+formula_word[list[4][1]]+"<img style='width: 0.6vw;height: 6vh;margin-left: 0.1vw;' src='../images/formula/a/you.png'/>"
			+'</p>');
			
			}else{
				$("#chalanFormula").append('<p style="    text-align: center;color: rgb(120, 203, 211);">'+list[2]+'</p>');
				$("#chalanFormula").append('<p style="    text-align: center;">'+formula_word[list[0][0]]+formula_word[list[0][1]]
				+"<img style='margin-right: 0.5vw;margin-bottom: 2vh;margin-left: 0.5vw;' src='../images/formula/a/den.png'/>"
				+'<span style="position: relative;top: -4px;font-size: 4vw;color: rgb(120, 203, 211);">'
				+(list[1][2]?'<img style="width: 1vw;margin-right: 1vw;margin-bottom: 1.7vh;" src="../images/formula/a/fu.png"/></span>':'</span>')
				+formula_word[list[1][0]]+formula_word[list[1][1]]+'</p>');
			}
			
		
	}
	
	
	
	chinese();
	//国际化
	function chinese(){
		
		if(localStorage.isEngish=="true"){
			$("#desscorediv").html("Target 100");
			var gaunka = $("#gscorediv").html();
			if(gaunka.indexOf("关卡")!=-1){
				
				gaunka = gaunka.replace(/关卡/, "Level")
				$("#gscorediv").html(gaunka);
			}
			$("#scorediv").html("Score");
			$("#scorediv").css("left","-8vw");
			
			$(".textdiv").html("Viewall formulas");
			$("#textdivRules").html("Viewall rules");
			$(".textdiv").css({left: "-79px",width: "27vw",transform: "rotateZ(90deg)", top: "81px"});
			if(!NAV_IS_PHONE){
				$(".textdiv").css({top: "24vh",left: "-11vw"});
				$("#textdivRules").css({top: "21vh",left: "-11vw"});
			}
			if(NAV_IS_PHONE){
				// $(".textdiv").css({left: "-92px",width: "27vw",transform: "rotateZ(90deg)", top: "101px"});
				
			}
			
			if(NAV_IS_PAD){
				$(".textdiv").css({left: "-150px",width: "27vw",transform: "rotateZ(90deg)", top: "159px"   ,  'font-size': '1.8vw'});
				
			}
			
			$("#gamepause1").attr("src","../images/gamepause/pause_en.png");
			$("#gamepause2").attr("src","../images/gamepause/replay_en.png");
			$("#gamepause3").attr("src","../images/gamepause/go_en.png");
			$("#gamepause4").attr("src","../images/gamepause/home_en.png");
			
			$("#gamefail1").attr("src","../images/gamesus/fail_en.png");
			$("#gamefail5").html("Come again～");
			$("#gamefail3").attr("src","../images/gamepause/home_en.png");
			$("#gamefail4").attr("src","../images/gamepause/replay_en.png");
			
			$("#gamesus1").attr("src","../images/gamesus/sus_en.png");
		
			$("#gamesus3").attr("src","../images/gamepause/home_en.png");
			$("#gamesus4").attr("src","../images/gamepause/replay_en.png");
		}else{
			$("#desscorediv").html("目标 100");
			var gaunka = $("#gscorediv").html();
			if(gaunka.indexOf("Level")!=-1){
				gaunka = gaunka.replace(/Level/, "关卡")
				$("#gscorediv").html(gaunka);
			}
			
			$("#scorediv").html("得分");
			$("#scorediv").css("left","-7vw");
			
			$(".textdiv").html("查看所有公式");
			$("#textdivRules").html("查看规则");
		}
		
		
		
		
	}
	
	
	
	/**
	 * 创建C竖直的那条线
	 * **/
	function creatDownline(){
		var v = document.createElement('div');
		v.className="line"
		v.style.width="0.4vw";
		v.style.height="5vh";
		v.style.position = "absolute";
		if(!NAV_IS_PHONE){
			v.style.left = "4vw";//30+(i*12)+"vw";//100+"px";
			v.style.top = "13vh";//100+"px";
		}else{
			v.style.left = "4vw";//30+(i*12)+"vw";//100+"px";
			v.style.top = "11vh";//100+"px";
		}
		
		v.style.backgroundColor="#2AC845";
		v.style["z-index"]=7;
		return v;
		//$(h).append(v);
	}
	
	
	
	document.getElementById("moveMask").addEventListener('tap',function(){
		
		var moveMask_time =  setTimeout(function(){
			$("#moveMask").hide();
		},1000);
		
	})
	
	
	
	
	function tweenLite(a,b,c){
		
		TweenLite.to(a, b, c);
		// a.left = c.left;
		// c.onComplete();
		// TweenLite.to(currentSquare.style, SPEED_H, {left:tmpleft,onComplete:function(){
		// 	console.log("滑动完毕6")
			
		// }}); 
	}
	
	//---------------------------------------------------------------------------------
	 queryLevel(parseInt($("#gscorediv").attr("level")),function(){
		  queryLevel(0);
	 });
	 
	 //总分数，  当前关卡分数
	 var total_Score = 0,current_score = 0;
	 var is_orgin = false;
	/**查询当前关卡的一系列信息**/
	function queryLevel(level,callback){
		// startGame();
		
		// return;
		$humanAjax(JS_PATH+'/score/queryMy',{
						data:{
							level: level
						},
						crossDomain :true,
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						success:function(data){
						
							//获得服务器响应
							console.log(data);
							if(data.status==200&&data.data){
								if(level==0){
									if(data.data.totalScore&&data.data.totalScore!="")
									total_Score = data.data.totalScore;
									
									
									
									
									
								}else{
									if(data.data.totalScore&&data.data.totalScore!="")
									current_score = data.data.totalScore;
									// score_game =  data.data.totalScore;
									// score_progressbar.style.width = score_game+"%";
									// score_progresstxt.innerHTML = score_game;
									if(data.data.content!="")
									GenerationRandom(JSON.parse(data.data.content));
									else
									 startGame();
								}
								
							}else{
								//不存在就创建
								createLevel(level);
								if(level!=0){
									startGame();
								}
							}
							if(typeof callback == 'function'){
								callback();
							}
							
						},error:function(e){
							
							console.log(e.responseJSON);
							
							
						}
					}
					,null
					,false
					," "
					);
		
		
	}
	
	
	/**创建当前关卡的信息**/
	function createLevel(level){
		//return;
		$humanAjax(JS_PATH+'/score/add',{
						data:{
							level: level
						},
						crossDomain :true,
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						success:function(data){
						
							//获得服务器响应
							console.log(data);
							if(data.status==200&&data.data){
								
							}else{
								//不存在就创建
								
								
							}
						
							
						},error:function(e){
							
							console.log(e.responseJSON);
						
							
						}
					}
					,null
					,false
					," "
					);
		
		
	}
	
	
	/*/ createLevel({
		
		totalScore:totalScore,
		
	})*/
	/**更新当前关卡的信息**/
	function updateLevel(param){
		//return;
		$humanAjax(JS_PATH+'/score/update',{
						data:
							// level: parseInt($("#gscorediv").attr("level"))
							param
							
						,
						crossDomain :true,
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						success:function(data){
						
							//获得服务器响应
							console.log(data);
							if(data.status==200&&data.data){
								
							}else{
								//不存在就创建
								
								
							}
						
							
						},error:function(e){
							
							console.log(e.responseJSON);
						
							
						}
					}
					,null
					,false
					," "
					);
		
		
	}
	
	
	//更新分数并保存关卡数据
	function updateScoreAnd(){
		var squareall = [];
		
		for(var i=0;i<7;i++){
			var sList = [];//保存从小到大的顺序square
			
			if($("#square"+(i+1)).length<1)break;
			squareall[i]=[];
			$("#square"+(i+1)+" .quantum").each(function(i,item){
				
				//var left = parseInt(item.style.left);
				//console.log("排序==",i,item["_type"]);
				sList.push(item);
				
				
			});
			sList.sort(function(a,b){
				
				return parseInt(a.style.left)-parseInt(b.style.left);
			});
			for(var j=0,n=sList.length;j<n;j++){
				squareall[i][j]=sList[j]['_type'];
				
			}
			
			
			
			
		}
		
		
		
		//更新单个关卡的
		updateLevel({
			level:parseInt($("#gscorediv").attr("level")),
			totalScore:score_game,
			howlong:100-parseInt($("#progresstxt").html()),
			content:JSON.stringify(squareall)
		})
		//更新总分
		if(total_Score<parseInt($("#gscorediv").attr("level"))){
			// total_Score=total_Score+score_game-current_score;
			updateLevel({
				level:0,
				totalScore:parseInt($("#gscorediv").attr("level"))
				// content:""
			})
		}
		
	}
	
	
	
	function GenerationRandom(list){
		
		for( var i=0,m=list.length;i<m;i++ ){
			var sList = list[i];//保存从小到大的顺序square
			
			if($("#square"+(i+1)).length<1)break;
			
			for(var j=0,n=sList.length;j<n;j++){
				var item = sList[j];
				if(i==m-1&&j==n-1)
					qscreatSquare(item,j,true,"#square"+(i+1),true);
				else
					qscreatSquare(item,j,true,"#square"+(i+1));
			}
			
		}
		//上一排C下一排做标记
		$("#square1 .quantum").each(function(index,item){
			
			if(item["_type"]==4){
				var square2 = $("#square2 .quantum").eq(index);//缓动还没完用位置获取下标不合适getSquareByLeft(index,"#square2");
				if(square2[0]["_type"]==0){
					//$(square2[0]).remove();
					//$(item).remove();
					square2[0]["_type"]=Math.floor(Math.random()*2)+1;
					$(square2[0]).find('img')[0].src = imgList[square2[0]["_type"]];
				}
					square2[0]["_parent"]=item;
					//$(square2).find("img").css("background-color","red");
					item["_child"]=square2[0]//$("#square2 .quantum")[index];
					console.log("================",item,square2[0]);
				
				
				
			}
			
		});
		$("#square3 .quantum").each(function(index,item){
			
			if(item["_type"]==4){
				var square2 = $("#square4 .quantum").eq(index);//缓动还没完用位置获取下标不合适getSquareByLeft(index,"#square2");
				if(square2[0]["_type"]==0){
					//$(square2[0]).remove();
					//$(item).remove();
					//var leftSquare = getSquareByLeft(deleteList[0]-1,squareParent);
					square2[0]["_type"]=Math.floor(Math.random()*2)+1;
					$(square2[0]).find('img')[0].src = imgList[square2[0]["_type"]];
				}
					square2[0]["_parent"]=item;
					//$(square2).find("img").css("background-color","red");
					item["_child"]=square2[0]//$("#square2 .quantum")[index];
					console.log("================",item,square2[0]);
				
			}
			
		});
		
	}
	
	//废掉
	var checkcount = 0;//是否判断计数器
	/**视图和数据分离存粹实现**/
	function qscreatSquare(random,startleft,isline,squareParent,ischeck){
		
		
			//var ran = Math.floor(Math.random()*(4-i));
			//console.log(ran);
			
				var h= document.createElement("div");
				$(h).append('<img/>');
				var img = $(h).find('img')[0];
				//console.log(img);
				h.className = "quantum";
				var _type = h["_type"]=random;//err[ran];
				h["_index"] = startleft;//判断谁先谁后得顺序
				/* var t = 3-i;
				if(ran != t){
					var tmp = err[t];
					err[t] = err[ran];
					err[ran] = tmp;
				}
				 */
				
				if(_type==0){
					img.src = h_img;
				}else if(_type==1){
					img.src = x_img;
				}else if(_type==2){
					img.src = y_img;
				}else if(_type==3){
					img.src = z_img;
				}else if(_type==4){
					img.src = c_img;
				}
				h.style["z-index"]=8;
				h.style.position = "absolute";
				h.style.left = "55vw";//30+(i*12)+"vw";//100+"px";
				h.style.top = "0vh";//100+"px";
				h["parentSquareName"]=squareParent;
				//创建线条
				var line =null;
				if(isline){
					line= document.createElement('div');
					line.style.width="11vw";
					line.style.height="0.4vh";
					line.style.position = "absolute";
					line.style.left = "40vw";//30+(i*12)+"vw";//100+"px";
					line.style.top = "5vh";//100+"px";
					line.style.backgroundColor="#2AC845";
					line.style["z-index"]=7;
					//document.body.appendChild(line);
					$(squareParent).append(line);
					//h.lineObj = line;
				}
				
				//document.body.appendChild(h);
				$(squareParent).append(h);
				//------------------------------
				h.style.width="7vw";
				h.style.height="15vh";
				if(NAV_IS_PHONE){
					img.style.top="1.1vh";
					img.style.left="1vw";
					$(h).css("background","url("+ bgList[Math.floor(Math.random()*5)] +") no-repeat");
					$(h).css("background-size","8vw 15vh");
				}else{
					img.style.top="4.2vh";
					img.style.left="2.2vw";
					img.style.width= "3.5vw";
					$(h).css("background","url("+ bgList[Math.floor(Math.random()*5)] +") no-repeat");
					$(h).css("background-size","8vw 18vh");
				}
				
				if(NAV_IS_PAD){
					img.style.top="2vh";
				}
				//------------------------------
				if(_type==4){
					// var v = document.createElement('div');
					// v.className="line"
					// v.style.width="0.4vw";
					// v.style.height="5vh";
					// v.style.position = "absolute";
					// v.style.left = "4vw";//30+(i*12)+"vw";//100+"px";
					// v.style.top = "11vh";//100+"px";
					// v.style.backgroundColor="#2AC845";
					// v.style["z-index"]=7;
					var v = creatDownline();
					$(h).append(v);
				}
				
				if(NAV_IS_PHONE){
				var isMove = false;
				var middleSquare = null;//中间态
				var isStartMove = 0;
				h.addEventListener('touchstart',function(e){
					console.log("按下",e.currentTarget["_type"],isMove);
					//isMove = false;
					//currentSquare = e.currentTarget;
					//currentSquare = null;
					middleSquare = e.currentTarget;
					isStartMove=1;
				});
				h.addEventListener('touchend',function(e){
					console.log("弹起",e.currentTarget["_type"],isMove);
					if(!isMove){
						squareclick(e);
					}
					
					
					isStartMove=0;
					isMove = false;
				});
				h.addEventListener('touchmove',function(e){
					//if(isStartMove==1){
						//isStartMove=2;
						isMove = true;
						if(isStartMove==3)return;
						//console.log(e.touches[0].clientX);
						//返回当前文档上处于指定坐标位置最顶层的Dom元素。
						var getMyElement=[];
						//if(isStartMove!=3)
						getMyElement = document.elementFromPoint ( e.touches[0].clientX , e.touches[0].clientY );
						
						if(!$(getMyElement).parent()||$(getMyElement).parent()<1)return;
						
						getMyElement = $(getMyElement).parent()[0];
						// console.log(getMyElement);
						if(getMyElement["_type"]==undefined)return;
						//console.log("getMyElement[_type]=",getMyElement["_type"],"middleSquare[_type]=",middleSquare["_type"]);
						currentSquare = middleSquare;
						if(
						middleSquare["_type"]!=getMyElement["_type"]){
							isStartMove=2;
						}else{
							if(((middleSquare["_parent"]||middleSquare["_child"])
							&&!getMyElement["_parent"]&&!getMyElement["_child"])||((getMyElement["_parent"]||getMyElement["_child"])
							&&!middleSquare["_parent"]&&!middleSquare["_child"])){
								isStartMove=2;
							}
						}
						if(isStartMove==2){
							isStartMove=3;
							//console.log("是三");
							squareclick({currentTarget:getMyElement});
						}
						
						
					//}
					
				}); 
				}else{
					h.addEventListener('tap',function(e){
						//console.log(e);
						squareclick(e);
					});
				}
				//var line1 = document.createElementNS("http://www.w3.org/2000/svg","line");//document.createElement('line');
				/* line1.x1 =0 //20+(i*12)+"vw";
				line1.y1 = 0//"40vh";
				line1.x2 = 100//30+(i*12)+"vw";
				line1.y2 = 100//"40vh"; */
				/* line1.setAttribute("x1",28+(i*12)+"vw");
				line1.setAttribute("y1","47vh");
				line1.setAttribute("x2",42+(i*12)+"vw");
				line1.setAttribute("y2","47vh");
							
				line1.style.stroke="rgb(186, 119, 119)";
				line1.style["stroke-width"]="2"; */
				//document.getElementById("svg").appendChild(line1);
				/* $("#svg").append(line1); */
				var top = "7vh"
				if(!NAV_IS_PHONE){
					top = "9vh"
				}
				if(line)
				tweenLite(line.style, SPEED_D, {left:startleft*5+"vw",top:top,onComplete:function(){
					
					
				}});
				// console.log("i=",i,"startleft=",startleft,"((i+startleft)*6)+'vw'=",((i+startleft)*6)+"vw");
				$("#moveMask").show();
				// checkcount++;
				 h["isDoing"] = "true";
				tweenLite(h.style, SPEED_D, {left:(startleft*6)+"vw",top:"0vh",onComplete:function(){
						// h["isDoing"] = "false";
						//checkSquare(squareParent);
						// checkcount--;
						// if(checkcount==0)
						if(ischeck)
						 checkSquare("cc");
						// checkSquare("#square2");
						// checkSquare("#square3");
						// checkSquare("#square4");
						// checkSquare("#square5");
						var time = setTimeout(function(){
							$("#moveMask").hide(200);
							clearTimeout(time);
						},200)
					
					isdraw = false;
				}});
			
		
	}
	
	var lastCreate = [];//最后创建的元素type,位置，个数
	/**核查**/
	function checkSquare(squareParent){
		
		if(squareParent!="#square1"&&squareParent!="cc")return;
		
		
		var isscore = false;
		if(squareParent=="#square1"){
			//表示交换得来
			console.log("交换")
		}
		
		var isD = false;
		checkHXH();
		var squareall = [];
		var squareaBox = [];
		var c_list = [];
		for(var i=0;i<7;i++){
			var sList = [];//保存从小到大的顺序square
			
			if($("#square"+(i+1)).length<1)break;
			squareall[i]=[];
			squareaBox[i]=[];
			$("#square"+(i+1)+" .quantum").each(function(i,item){
				
				//var left = parseInt(item.style.left);
				//console.log("排序==",i,item["_type"]);
				sList.push(item);
				
				if(item["isDoing"]=="true"){
					isD = true;
					item["isDoing"]="false"
				}
			});
			// if(isD)return;
			sList.sort(function(a,b){
				
				return parseInt(a.style.left)-parseInt(b.style.left);
			});
			for(var j=0,n=sList.length;j<n;j++){
				squareall[i][j]=sList[j]['_type'];
				squareaBox[i][j]=sList[j];
				if(sList[j]['_type']==4){
					//记录下C方块下标
					c_list[i]=j;
					c_list[i+1]=j;
				}
			}			
			
		}
		
		
		
		console.log(squareall);
		for( var i=0,m= squareall.length;i<m;i++){
			var list = squareall[i];
			var c = c_list[i];//C方块的下标
			for( var j=0,n=list.length;j<n;j++ ){
				var value = list[j];
				
				var next = -2;
				if(j<n-1)
				next = list[j+1];
				
				if( j<n-1&&value!=4 &&j!= c_list[i] &&(!squareaBox[i][j]["_child"]&&!squareaBox[i][j]["_parent"]
				&&!squareall[i][j+1]["_child"]&&!squareaBox[i][j+1]["_parent"])){
					if(value==next){
						squareall[i][j]=-1;
						
						squareall[i][j+1]=-1;
					}
					
				}
				
				if(n<8){
					if(j==n-1){
						if(j-3>=0)
						lastCreate[4] = squareaBox[i][j-1]['_type'];//不要形成HXH
						lastCreate[0] = squareaBox[i][j]['_type'];
						lastCreate[1] =8-n;
						lastCreate[2] =7;
						lastCreate[3] = squareaBox[i][0]["parentSquareName"]
						var c_time = setTimeout(function(){
							clearTimeout(c_time)
							// checkSquare("cc");
							if(lastCreate.length>0)
							sleepCreate(lastCreate[0] ,lastCreate[1] ,lastCreate[2],lastCreate[3] )
							
							
							
						},20)
						
						
						
						
					}
					
				}
				
				
			}
		}
		//把连续的相同的都替换成-1
		
		
		// whois(currentSquare,lastSquare,e.currentTarget["parentSquareName"]);
		
		for( var i=0,m= squareall.length;i<m;i++){
			var list = squareall[i];
			var c = c_list[i];//C方块的下标
			var isFu = false;//在右边时是否有-1产生
			var xu = 0;//表示需要产生的方块数
			// if(i==3){
			// 	console.log(1);
			// }
			
			for( var j=0,n=list.length;j<n;j++ ){
				var value = list[j];
				var youlist = [];//保存右边-1坐标
				//表示在C的左边
				if( value==-1 && j<c){
					
					
					
					var l = -2,r=-2;//list[j]
					
					if(j>0){
						l =list[j-1];
					}
					
					if(j<n-1){
						r = list[j+1];
					}
					
					var b = null;
					if(j>=2){
						b = list[j-2];
						
					}
					
					squareall[i][j] = getRfb(l,r,b);
					var parent = squareaBox[i][j]["parentSquareName"];
					xu++;
					
					options.pos=[{x:$(squareaBox[i][j]).offset().left-30,y:$(squareaBox[i][j]).offset().top+30},
						{x:$(squareaBox[i][j]).offset().left+30,y:$(squareaBox[i][j]).offset().top+30}];
						_isStop = false;
						$("#particle").openSound();
						$("#particle").show();
					
					if(j<n-1&&list[j+1]==-1){
						showDisplay(squareaBox[i][j],squareaBox[i][j+1]);
						// defengHandler();
						// if(score_game>=100){
						// 	$("#gamesus").show();
						// 	if(!localStorage.level)localStorage.level=1;
							
						// 	localStorage.level = parseInt(localStorage.level)+1;
						// }
					}else{
						 // showDisplay(squareaBox[i][j],squareaBox[i][j]);
						defengHandler();
						if(xu>2){
							defengHandler();						 
													 
						}
						if(score_game>=100){
							$("#gamesus").show();
							if(!localStorage.level)localStorage.level=1;
							
							localStorage.level = parseInt(localStorage.level)+1;
						}
						
					}
					
					creatBao($(squareaBox[i][j]).offset().left-15+'px',$(squareaBox[i][j]).offset().top-15+'px');
					// creatOther(squareaBox[i][j]);
					
					$(squareaBox[i][j]).remove();
					isscore = true;
					qscreatSquare(squareall[i][j],j,false,parent,false);
				}else if(value==-1 && (j>c || !c)){
					isFu = true;
					xu++;
					
					options.pos=[{x:$(squareaBox[i][j]).offset().left-30,y:$(squareaBox[i][j]).offset().top+30},
						{x:$(squareaBox[i][j]).offset().left+30,y:$(squareaBox[i][j]).offset().top+30}];
						_isStop = false;
						$("#particle").openSound();
						$("#particle").show();
					if(j<n-1&&list[j+1]==-1){
						showDisplay(squareaBox[i][j],squareaBox[i][j+1]);
						// defengHandler();
						// if(score_game>=100){
						// 	$("#gamesus").show();
						// 	if(!localStorage.level)localStorage.level=1;
							
						// 	localStorage.level = parseInt(localStorage.level)+1;
						// }
					}else{
						 // showDisplay(squareaBox[i][j],squareaBox[i][j]);
						 
						 
						
						defengHandler();
						if(xu>2){
							defengHandler();						 
													 
						}
						if(score_game>=100){
							$("#gamesus").show();
							if(!localStorage.level)localStorage.level=1;
							
							localStorage.level = parseInt(localStorage.level)+1;
						}
						
					}
					
					creatBao($(squareaBox[i][j]).offset().left-15+'px',$(squareaBox[i][j]).offset().top-15+'px');
					// creatOther(squareaBox[i][j]);				
					$(squareaBox[i][j]).remove();
					isscore = true;
					youlist.push(j);
					
					
					
					// if(j==n-1){
					// 	console.log("--判定--",xu);
					// 	 var left = null//squareaBox[i][n-1]["_type"];
					// 	for(var z=xu-1;z>-1;z--){
					// 		var l = -2,r=-2;//list[j]
							
					// 		if(j>z){
					// 			l =list[j-1-z];
					// 		}
							
					// 		if(left)l=left;
							
					// 		if(j<n-z-1){
					// 			r = list[j+1-z];
					// 		}
							
					// 		left = squareall[i][j-z] = getRf(l,r);
					// 		var parent = squareaBox[i][0]["parentSquareName"];
							
					// 		qscreatSquare(left,j-z,false,parent,false);
						
					// 	}
					// }
					if(j==n-1){
						if(j-3>=0)
						lastCreate[4] = squareaBox[i][j-3]['_type'];//不要形成HXH
						lastCreate[0] = squareaBox[i][j-2]['_type'];
						lastCreate[1] =xu;
						lastCreate[2] =j;
						lastCreate[3] = squareaBox[i][0]["parentSquareName"]
						if(lastCreate.length>0)
						sleepCreate(lastCreate[0] ,lastCreate[1] ,lastCreate[2],lastCreate[3] )
						
					}
				}else if(isFu){
					//tweenLite(h.style, SPEED_D, {left:(startleft*6)+"vw",top:"0vh",onComplete:function(){
					// checkcount++;
					squareaBox[i][j]["isDoing"] = "true";
					//SPEED_H
					tweenLite(squareaBox[i][j].style, SPEED_H, {left:((j-xu)*6)+"vw",onComplete:function(e){
						console.log("滑动完毕====",this)
						// squareaBox[i][j]["isDoing"] = "false";
						// checkcount--;
						// if(checkcount==0)
						var c_time = setTimeout(function(){
							clearTimeout(c_time)
							// checkSquare("cc");
							if(lastCreate.length>0)
							sleepCreate(lastCreate[0] ,lastCreate[1] ,lastCreate[2],lastCreate[3] )
							
							
							
						},20)
						
					
					}});
					if(j==n-1){
						if(j-3>=0)
						lastCreate[4] = squareaBox[i][j-1]['_type'];//不要形成HXH
						lastCreate[0] = squareaBox[i][j]['_type'];
						lastCreate[1] =xu;
						lastCreate[2] =j;
						lastCreate[3] = squareaBox[i][0]["parentSquareName"]
						
					}
					
					
					
					
					// squareaBox[i][j].style.left=((j-xu)*6)+"vw"
					
					// if(j==n-1){
					// 	console.log("--判定--",xu);
					// 	var left = null//squareaBox[i][j]["_type"];
					// 	for(var z=xu-1;z>-1;z--){
					// 		var l = -2,r=-2;//list[j]
							
					// 		if(j>z){
					// 			l =list[j-1-z];
					// 		}
							
					// 		if(left)l=left;
							
							
							
					// 		if(j<n-z-1){
					// 			r = list[j+1-z];
					// 		}
							
					// 		left = squareall[i][j-z] = getRf(l,r);
					// 		var parent = squareaBox[i][0]["parentSquareName"];
					// 		// setTimeout(function(){
					// 			 qscreatSquare(left,j-z,false,parent,false);
					// 		// },2000)
							
					// 	}
						
						
					// }
					
					
				}
				
				
				
				
			}
			
		}
		
		
		if(squareParent=="#square1"){
			//表示交换得来
			if(!isscore){
				//没得分要减分
				score_game-=2;
				if(score_game<0)score_game=0;
				else{
					if(score_game>0){
						
						
						
						if(localStorage.isEngish=="true"){
							//mui.toast("minus 2 scores");
							
						}else{
							//mui.toast("减2分");
						}
						
						$("#formula").append('<div class="xiaoshi scoreminus" style="color: goldenrod;font-size: 3vw;display: flex;align-items: center;justify-content: center;">'
						
						+'-2</div>');
						
						
						
						
						
						var time = setTimeout(function(){
							clearTimeout(time);
							 $(".scoreminus").hide();
						},1500);
						
					}
					
				}
				
				
				score_progressbar.style.width = score_game+"%";
				score_progresstxt.innerHTML = score_game;
			}
		}
	}
	
	
	function sleepCreate(x,y,w,v){
		console.log("---创建元素----",x,y,w,v);
		var left=-3;//null不行有0时无法判断
		
		for(var z=y-1;z>-1;z--){
			
				if(left==-3)
				left =getL(x,lastCreate[4]);
				else left =getL(left,x);
				var parent = v;
				// setTimeout(function(){
					 qscreatSquare(left,w-z,false,parent,true);
				// },2000)
				console.log(z+"---创建元素----",left);
			}
		
		lastCreate=[];
	}
	
	function getL(r,b){
		var ccr = [0,1,2,3];
		for(var i=0;i<ccr.length;i++){
			if(ccr[i]==r){
				ccr.splice(i,1);
				i--;
			}
		}
		
		for(var i=0;i<ccr.length;i++){
			if(b==0&&r==1&&ccr[i]==0){
				ccr.splice(i,1);
				i--;
			}
		}
		
		var rr = ccr[Math.floor(Math.random()*(ccr.length))];
		
		
		
		
		return rr;
	}
	/**两个确定的中间产生一个**/
	function getRfb(r,f,b){
		var ccr = [0,1,2,3];
		for(var i=0;i<ccr.length;i++){
			if(ccr[i]==r||ccr[i]==f){
				ccr.splice(i,1);
				i--;
			}
		}
		
		for(var i=0;i<ccr.length;i++){
			if(b==0&&r==1&&ccr[i]==0){
				ccr.splice(i,1);
				i--;
			}
		}
		
		var rr = ccr[Math.floor(Math.random()*(ccr.length))];
		return rr;
	}
	
	
	/**创建查看公司按钮**/
	function  creatQueryRule(){
		var div = document.createElement('div');
		div.style.position="absolute";
		div.style.left = "0px";
		div.style.top="74vh";
		//$(div).addClass();
		$("body").append(div);
		
		var img = document.createElement('img');
		
		img.src="../images/formula/query.png";
		img.style.width="4vw";
		img.style.height="22vh";
		$(div).append(img);
		var textdiv = document.createElement('div');
		textdiv.id="textdivRules"
		textdiv.style.position="absolute";
		textdiv.style.left = "0px";
		textdiv.innerHTML="查看规则";
		textdiv.style.width="4vw";
		textdiv.style.top="0px";
		textdiv.className="textdiv";
		//$(div).addClass();
		$(div).append(textdiv);
		if(NAV_IS_PAD){
			$(".textdivRules").css({'font-size': '2vh','line-height': '3vh'});
		}
		
		var chalanFormula = document.createElement('div');
		chalanFormula.id="chalanRlue";
		chalanFormula.style.left="16vw";
		chalanFormula.style.position="absolute";
		chalanFormula.style.top="0px";
		chalanFormula.style.zIndex=100;
		chalanFormula.style.backgroundColor="black";
		chalanFormula.style.display="none";
		chalanFormula.style.height="100vh";
		chalanFormula.style.width="70vw";
		chalanFormula.style.overflowY="auto";
		chalanFormula.style.color="#78CBD3";
		//$("#chalanFormula").hide();
		$("body").append(chalanFormula);
		// var img = document.createElement('img');
		// img.src = "../images/formula/all.png";
		// img.style.width="70vw"
		// $(chalanFormula).append(img);
		$(chalanFormula).css("text-align","center");
		
		if(localStorage.isEngish=="true"){
			$(chalanFormula).append("<p>-------------------------------Game bonus rules-----------------------------------</p>");
			
			$(chalanFormula).append("<p>1.5 points will be added if it conforms to the cancellation rule of quantum gate formula</p>");
			$(chalanFormula).append("<p>2.Add 5 points from the 1st to the 4th and 4 points after the 5th</p>");
			$(chalanFormula).append("<p>3.The unit matrix generated by the exchange of two quantum gates is also scored according to the regulations of each gate</p>");
			$(chalanFormula).append("<p>-------------------------------Game score reduction rules-----------------------------------</p>");
			$(chalanFormula).append("<p>1.It conforms to the exchange rule of quantum gate formula without generating unit matrix, minus 2 points</p>");
			$(chalanFormula).append("<p>2.The target score is already 0, no points will be deducted</p>");
			
		}else{
			$(chalanFormula).append("<p>-------------------------------游戏加分规则-----------------------------------</p>");
			
			$(chalanFormula).append("<p>1.符合量子门公式抵消规则,按照各关卡不同加分</p>");
			$(chalanFormula).append("<p>2.第1关到第4关加5分，第5关后加4分</p>");
			$(chalanFormula).append("<p>3.双量子门交换产生单位矩阵也按照各关卡规定加分数加分</p>");
			$(chalanFormula).append("<p>-------------------------------游戏减分规则-----------------------------------</p>");
			$(chalanFormula).append("<p>1.符合量子门公式交换规则而不产生单位矩阵,减2分</p>");
			$(chalanFormula).append("<p>2.目标分值已经为0不扣分</p>");
		}
		
		
		
		// for(var i=0,m=formulaList.length;i<m;i++){
		// 	var item = formulaList[i];
		// 	 chalanFormulaHandler(item)
			
		// }
		
		div.addEventListener('tap',function(){
			console.log("查看公式");
			isPause = !isPause;
			if($("#chalanRlue").is(":visible")){
				$("#chalanRlue").hide();
			}else
			$("#chalanRlue").show();
			
		});
		
	}
	
	
	$("body").click(function(e){
		
		
		console.log(e.target);
		
		if($("#chalanRlue").is(":visible")){
			
			if(e.target.id=="mui-content"){
				$("#chalanRlue").hide();
			}
		}
		if($("#chalanFormula").is(":visible")){
			
			if(e.target.id=="mui-content"){
				$("#chalanFormula").hide();
			}
		}
	});
	
	
	
	