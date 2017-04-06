var ele_num=5;    /*电梯总数*/
var floor_num=20;   /*楼层总数*/
var move_Time=1000; /*电梯运行时间*/
var wait_Time=2000; /*开门等待时间*/
$(document).ready(function(){
	/*加载五部电梯UI*/
	for(i=0;i<ele_num;i++){
		document.getElementById("container").innerHTML+="<li><div id='ele'><ul id='led'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><div id='info'><ul id='name'><li>ID:</li><li>state:</li><li>now_floor:</li><li>next_floor:</li><li>wait:</li><li>door:</li></ul><ul id='con'><li>01</li><li>stop</li><li>1</li><li>1</li><li>0</li><li>close</li></ul></div><div id='door'><p id='con_floor'></p><p id='con_wait'></p><div id='left_door'></div><div id='right_door'></div></div><div id='inner_btn'><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li id='close'>&gt;&lt;</li><li id='open'>&lt;&gt;</li><li id='help'>!</li></ul></div></div></li>";
		$("#container li:nth-of-type("+(i+1)+") #ele #info #con li:nth-of-type(1)").text(i+1);/*修改电梯ID*/
	}
	
	/*加载楼层按钮UI*/
	for(i=0;i<floor_num;i++){
		document.getElementById("btn").innerHTML+="<li><div id='label'></div><div id='up'></div><div id='down'></div></li>";
		$("#btn li:nth-of-type("+(i+1)+") #label").text(i+1); /*修改层数显示*/
		$("#btn li:nth-of-type("+(i+1)+") #up").text(">");
		$("#btn li:nth-of-type("+(i+1)+") #down").text(">");
	}
	$("#btn li:nth-of-type("+1+") #down").hide();
	$("#btn li:nth-of-type("+20+") #up").hide();
	
	
	/*添加电梯实例，creatEle为生成电梯的函数，参见dt.js*/
	var ele=new Array(ele_num);
	for(i=0;i<ele_num;i++){
		ele[i]=createEle(i+1,"stop",1,1,0,"close");
	};
	
	/*寻找到达时间最短的电梯，参数说明：目标楼层，楼层意向up/down*/
	function get_min_time(floor,F_S){	
		var time=1000;
		var num=0;
		var help_cnt=0; 
		for(k=0;k<ele_num;k++){
			if(ele[k].help==true){
				help_cnt++;
			}
			else{
				var tmp=ele[k].calculate(floor,F_S);/**/
				if(tmp<time){
					time=tmp;
					num=k+1;
				}
			}
		}
		/*如果五部电梯都在维修，则不可申请*/
		if(help_cnt==5){
			alert("五部电梯都不可用，请等待维修后再次点击！");
			arrive($("#btn li:nth-of-type("+floor+") #"+F_S)); 
		}
		else{
			ele[num-1].insert(num,floor,F_S);/*将楼层插入到找到的电梯的就绪队列*/
		}
	}
	/*添加楼层按钮效果*/
	for(i=0;i<floor_num;i++){
		/*鼠标移到上面的效果*/
		$("#btn li:nth-of-type("+(i+1)+") #up").hover(function(){
			$(this).css("background","rgba(0,0,0,0.2)");
		});
		$("#btn li:nth-of-type("+(i+1)+") #down").hover(function(){
			$(this).css("background","rgba(0,0,0,0.2)");
		});
		/*鼠标离开按钮的效果*/
		$("#btn li:nth-of-type("+(i+1)+") #up").mouseleave(function(){
			$(this).css("background","white");
		});
		$("#btn li:nth-of-type("+(i+1)+") #down").mouseleave(function(){
			$(this).css("background","white");
		});
		/*鼠标点击按钮的效果*/
		$("#btn li:nth-of-type("+(i+1)+") #up").click(function(){
			if(click_down($(this))){
				get_min_time($(this).parent().index()+1,"up");
			}
		});
		$("#btn li:nth-of-type("+(i+1)+") #down").click(function(){
			if(click_down($(this))){
				get_min_time($(this).parent().index()+1,"down");
			}
		});
	}
	/*电梯内部楼层按钮效果*/
	for(i=0;i<floor_num+2;i++){/*+2的原因：开门关门键*/
		/*鼠标移到上面的效果*/
		$("#inner_btn ul li:nth-of-type("+(i+1)+")").hover(function(){
				$(this).css("background","rgba(0,0,0,0.2)");
		});
		/*鼠标离开按钮的效果*/
		$("#inner_btn ul li:nth-of-type("+(i+1)+")").mouseleave(function(){
				$(this).css("background","white");
		});
	}
	for(i=0;i<floor_num;i++){
		/*鼠标点击按钮的效果*/
		$("#inner_btn ul li:nth-of-type("+(i+1)+")").click(function(){
			if(ele[$(this).parent().parent().parent().parent().index()].help==true){
				alert("电梯正在维修");
				return;
			}
			if(ele[$(this).parent().parent().parent().parent().index()].in==false){  /*如果电梯里面没人，则不能点击按钮*/
				alert("请先进入电梯！");
				return;
			}
			$(this).css("background","rgba(0,0,0,0.2)");
			$(this).css("color","red");
			$(this).mouseleave(function(){
				$(this).css("background","rgba(0,0,0,0.2)");
			});
			var e=$(this).parent().parent().parent().parent().index()+1;
			var g=$(this).index()+1;
			ele[e-1].insert(e,g,"inner");    /*将目标楼层插入就绪队列*/
		});
	}
	/*关门按钮*/
	$("#inner_btn ul #close").click(function(){
		if(ele[$(this).parent().parent().parent().parent().index()].help==true){
			alert("电梯正在维修");
			return;
		}
		if(ele[$(this).parent().parent().parent().parent().index()].in==false){
			alert("电梯内没人，理论上不能按这个按钮哦!");
			return;
		}
		ele[$(this).parent().parent().parent().parent().index()].click_close();/*调用关门函数，开门关门函数详见dt.js*/
	});
	/*开门按钮*/
	$("#inner_btn ul #open").click(function(){
		if(ele[$(this).parent().parent().parent().parent().index()].help==true){
			alert("电梯正在维修");
			return;
		}
		if(ele[$(this).parent().parent().parent().parent().index()].in==false){
			alert("电梯内没人，理论上不能按这个按钮哦!");
			return;
		}
		ele[$(this).parent().parent().parent().parent().index()].click_open();/*调用开门函数*/
	});
	/*报警键*/
	$("#inner_btn ul #help").click(function(){
		var e=$(this).parent().parent().parent().parent().index();
		/*如果电梯已经在维修，则是电梯继续运行*/
		if(ele[e].help==true){
			ele[e].help=false;
			close(ele[e].id);/*关门*/
			var value=$("#container li:nth-of-type("+ele[e].id+") #ele #info #con li:nth-of-type(6)").text("close");/*修改门的状态显示*/
			var value=$("#container li:nth-of-type("+ele[e].id+") #ele #info #con li:nth-of-type(6)").css("color","black");/*修改门状态显示的颜色*/
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_floor").text("电梯正常运行");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_floor").css("color","black");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_wait").text("");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_wait").css("font-size","25px");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_wait").css("color","black");
			$(this).css("color","white");
			alert("恭喜您，第"+ele[e].id+"台电梯已正常运行！");
		}
		/*如果电梯正在运行，则强制停止运行*/
		else if(ele[e].help==false){
			ele[e].help=true;
			open(ele[e].id);/*开门*/
			var value=$("#container li:nth-of-type("+ele[e].id+") #ele #info #con li:nth-of-type(6)").text("open");
			var value=$("#container li:nth-of-type("+ele[e].id+") #ele #info #con li:nth-of-type(6)").css("color","red");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_floor").text("电梯已停止运行");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_floor").css("color","red");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_wait").text("点击报警键继续运行");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_wait").css("font-size","14px");
			$("#container li:nth-of-type("+ele[e].id+") #ele #door #con_wait").css("color","white");
			$(this).css("color","red");
			alert("已经强行停止第"+ele[e].id+"台电梯，如要继续运行，请再次点击即可！");
		}
	});
});