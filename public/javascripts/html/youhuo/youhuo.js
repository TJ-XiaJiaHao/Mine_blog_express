var current=0;
var before=0;
var total_img=8;    //横幅总数
var changing=true;  //判断是否要自动切换横幅,下次可以尝试cleartimeout
$(document).ready(function(){
	//把第一张横幅移到滚动条中
	$("#banner ul li").eq(0).animate({left:'0px'},0);
	$("#bn ul li").eq(0).animate({opacity:'1'},0);
	//鼠标移动到下面小图标时切换到对应横幅
	$("#bn ul li").hover(function(){
		changing=false;     
		before=current;
		current=$(this).index();
		if(current>before){
			$("#banner ul li").eq(before).animate({left:'-1150px'},0);
			$("#banner ul li").eq(current).animate({left:'0px'},0);
			$("#bn ul li").eq(before).animate({opacity:'0.3'},0);
			$("#bn ul li").eq(current).animate({opacity:'1'},0);
		}
		else if(current<before){
			$("#banner ul li").eq(before).animate({left:'1150px'},0);
			$("#banner ul li").eq(current).animate({left:'0px'},0);
			$("#bn ul li").eq(before).animate({opacity:'0.3'},0);
			$("#bn ul li").eq(current).animate({opacity:'1'},0);
		}
	});
	//将滚动条设定为不自动切换
	$("#banner").hover(function(){
		changing=false;
	});
	//鼠标离开后开始自动切换
	$("#bn ul li").mouseleave(function(){
		changing=true;
	});
	$("#banner").mouseleave(function(){
		changing=true;
	});
	//点击向左按钮横幅向左切换
	$("#left").click(function(){
		before=current;
		current=(current+1)%total_img;
		$("#banner ul li").eq(current).animate({left:'1150px'},0);
		$("#banner ul li").eq(before).animate({left:'-1150px'},200);
		$("#banner ul li").eq(current).animate({left:'0px'},200);
		$("#bn ul li").eq(before).animate({opacity:'0.3'},0);
		$("#bn ul li").eq(current).animate({opacity:'1'},0);
	});
	//点击向右按钮横幅向右切换
	$("#right").click(function(){
		before=current;
		current=(current+total_img-1)%total_img;
		$("#banner ul li").eq(current).animate({left:'-1150px'},0);
		$("#banner ul li").eq(before).animate({left:'1150px'},200);
		$("#banner ul li").eq(current).animate({left:'0px'},200);
		$("#bn ul li").eq(before).animate({opacity:'0.3'},0);
		$("#bn ul li").eq(current).animate({opacity:'1'},0);
	});
});
//自动切换函数
function auto_change(){
	if(!changing){setTimeout("auto_change()",1000);}
	else{
		before=current;
		current=(current+1)%total_img;
		$("#banner ul li").eq(current).animate({left:'1150px'},0);
		$("#banner ul li").eq(before).animate({left:'-1150px'},500);
		$("#banner ul li").eq(current).animate({left:'0px'},500);
		$("#bn ul li").eq(before).animate({opacity:'0.3'},0);
		$("#bn ul li").eq(current).animate({opacity:'1'},0);
		setTimeout("auto_change()",2000);
	}
}
setTimeout("auto_change()",2000);