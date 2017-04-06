$(document).ready(function(){
	var before=1;
	var cunrrent=1;
	$("#baidu .nav ul li").click(function(){
		$(this).addClass("news").siblings().removeClass("news");
		before=cunrrent;
		cunrrent=$(this).index();
		if(cunrrent<before){
			$("#baidu .con ul li").eq(cunrrent).animate({top:'-315px'},0);
			$("#baidu .con ul li").eq(cunrrent).animate({top:'0px'},500);
			$("#baidu .con ul li").eq(before).animate({top:'315px'},500);
		}
		else if(cunrrent>before){
			$("#baidu .con ul li").eq(cunrrent).animate({top:'315px'},0);
			$("#baidu .con ul li").eq(cunrrent).animate({top:'0px'},500);
			$("#baidu .con ul li").eq(before).animate({top:'-315px'},500);
		}
	});
});