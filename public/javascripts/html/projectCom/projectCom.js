
$(document).ready(function(){
	
	//搜索栏点击选择搜索类型
	$("#select").hide();
	$("#search_type").hover(function(){
		$("#select").show();
	});
	$("#search_type").mouseleave(function(){
		$("#select").hide();
	});
	$("#select li").click(function(){
		$("#search_type label").text($(this).text());
		$("#select").hide();
	});
	$("#avg li:nth-of-type(1)").click(function(){
		alert("项目资讯模块正在完善");
	})
	$("#avg li:nth-of-type(2)").click(function(){
		alert("学校达人模块正在完善");
	})
	$("#avg li:nth-of-type(3)").click(function(){
		alert("精品文章模块正在完善");
	})
	
	$(".login_btn").click(function(){
		alert("登陆模块正在完善");
	})
	$(".regist_btn").click(function(){
		alert("注册模块正在完善");
	})
	$("#search_img").click(function(){
		alert("搜索成功！");
	});
	//轮播图
	$("#banner").click(function(){
		alert("轮播图正在完善");
	});
	//添加最新项目
	function add_con(type,title,nw,begin,end,need,state){
		$("#projects").append("<li class='row'><ul><li><label id='type'>"+type+"</label></li><li id='title'>"+title+"</li><li><label id='nw'>"+nw+"</label></li><li>"+begin+"</li><li>"+end+"</li><li>"+need+"</li><li><label id='state'>"+state+"</label></li></ul></li>");
	}
	for(i=0;i<9;i++){
		add_con("上海创新学分项目","饮食管理系统","new","2016/5/9","2017/8/27","3","招人中");
	}
	
	//添加人气达人
	function add_hot(head,name,rank,projects,score,school,call){
		$("#hot_people").append("<li class='row'><ul><li><img id='head' src='"+head+"'></liS><li id='name'>"+name+"</li><li><label id='rank'>"+rank+"</label></li><li>"+projects+"</li><li>"+score+"</li><li>"+score+"</li><li><label id='call'>"+call+"</label></li></ul></li>");
	}
	for(var i=0;i<9;i++){
		add_hot("/images/html/projectCom/heads/head1.jpg","随便玩玩197","此处为星级图片","5","287","同济大学","联系方式");
	}
	
	//最新项目和人气达人的点击效果
	$("#hot_people").css("opacity","0");
	$("#hot_people").hide();
	$("#choose li").click(function(){
		$(this).css("background","#0c0b11");
		$(this).css("color","white");
		$(this).siblings().css("background","white");
		$(this).siblings().css("color","black");
		if($(this).index()==1){
			$("#hot_people").show();
			$("#hot_people").animate({opacity:'1'},200);//animate({left:'0px'},200);
			$("#projects").animate({opacity:'0'},200);//animate({left:'-1200px'},200);
		}
		else if($(this).index()==0){
			$("#hot_people").animate({opacity:'0'},200,function(){$("#hot_people").hide();});//animate({left:'1200px'},200);
			$("#projects").animate({opacity:'1'},200);//animate({left:'0px'},200);
		}
	});
	$("#title").click(function(){
		alert("项目详细信息正在路上");
	});
	$("#call").click(function(){
		alert("联系方式正在路上");
	});
});
	//轮播图
	var current=0;
	var before=0;
	var total_img=2;
	var changing=true;
	function auto_change(){
		if(!changing){setTimeout("auto_change()",3000);}
		else{
			move=true;
			setTimeout("can_move()",500);
			before=current;
			current=(current+1)%total_img;
			$("#banner li").eq(current).animate({left:'100%'},0);
			$("#banner li").eq(before).animate({left:'-100%'},500);
			$("#banner li").eq(current).animate({left:'0px'},500);
			$("#num li").eq(current).css("background","white");
			$("#num li").eq(before).css("background","rgba(0,0,0,0)");
			setTimeout("auto_change()",3000);
		}
	}
	setTimeout("auto_change()",3000);