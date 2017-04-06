$(document).ready(function(){
	var car_out=false;
	//购物车展开缩进效果
	$("#car_img").click(function(){
		if(car_out){
			$("#car").animate({right:'-220px'},500);
			car_out=false;
		}
		else if(!car_out){
			$("#car").animate({right:'0px'},500);
			car_out=true;
		}
	});
	function addProduct(event){
		//设置落脚点
		var offset=$("#car_img").offset();
		//设置起始点
		var _this=$(event.target);
		//获取目标图片地址
		var src=_this.parent().parent().find('img').attr('src');
		//新建一个img
		var flyer=$('<img src="'+src+'" class="fly"/>');
		//抛物线动画
			flyer.fly({
				start:{
					left:event.clientX,
					top:event.clientY
				},
				end:{
					left:offset.left+20,
					top:offset.top-30,
					width:0,
					height:0
				},
				onEnd:function(){
					flyer.fadeOut('slow',function(){
						$(this).remove();
					});
				}
				
			});
		
	}
	//添加购买内容
	$("p.price span").click(function(event){
		addProduct(event);
		var _this=$(event.target);
		var src=_this.parent().parent().find("img").attr("src");
		var title=_this.parent().parent().find("p.title").html();
		var price=_this.parent().find("font").html();
		$("#car_con").append('<dl><dt><img src="'+src+'" height="60px" width="60px"></dt><dd>'+title+'<p>'+price+'</p></dd></dl>');
	});
	
});